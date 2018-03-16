const crypto = require('crypto');
const bodyParser = require('body-parser');
const request = require('request-promise-native');
const { GraphQLClient } = require('graphql-request');

const client = new GraphQLClient(`http://localhost:${process.env.port || 4000}`);

const tbaRequest = request.defaults({
  baseUrl: 'https://www.thebluealliance.com/api/v3',
  headers: {
    'X-TBA-Auth-Key': process.env.TBA_AUTH_KEY,
  },
  simple: false,
  transform: async function (body, response, resolveWithFullResponse) {
    let res;
    if (response.statusCode === 200) {
      client.request(`
        mutation($url: String!, $modified: String!, $body: String!) {
          upsertTBAUpdateRecord (endpoint: $url, lastModified: $modified, lastResponse: $body) { endpoint }
        }
      `, { url: this.url, modified: response.headers['last-modified'], body });
      res = body;
    } else if (response.statusCode === 304) {
      res = ( await client.request(`
        query($url: String!) {
          tbaUpdateRecord(endpoint: $url) {
            lastResponse
          }
        }
      `, { url: this.url }) ).tbaUpdateRecord.lastResponse;
    } else {
      throw new Error(console.error(`TBA request returned ${response.statusCode}`));
    }
    
    return JSON.parse(res);
  }
});

async function login() {
  if (client.options.headers && client.options.headers.authorization) return;
  // Log in
  const token = ( await client.request(`
    mutation {
      login(email: "tba-api@localhost", password: "") { token }
    }
  `) ).login.token;
  client.options.headers = { authorization: `Bearer ${token}` };
}

async function tryTbaRequest(url) {
  const rec = ( await client.request(`
    query($url: String!) {
      tbaUpdateRecord(endpoint: $url) { lastModified }
    }
  `, { url }) ).tbaUpdateRecord || {};
  
  const lastModified = rec.lastModified;
  
  try {
    const res = await tbaRequest({
      url,
      headers: {
        'if-modified-since': lastModified,
      },
    });
    return res;
  } catch(err) {
      throw new Error(`${err.message}`);
  }
}

async function saveTeamData(name, type, val, team_key) {
  return client.request(`
    mutation($name: String!, $type: FieldType!, $val: String!, $teamNum: Int!) {
      upsertTBATeamData(fieldName: $name, type: $type, value: $val, teamNumber: $teamNum) { name }
    }
  `, { name, type, val, teamNum: team_key.substr(3) });
}

async function updateTeams() {
  console.log('Updating team info from API...');
  
  await login();
  
  // TODO - If this doesn't work and there's a new team, many thigs after this will break, since the API
  // upserts assuming the team exists... Figure out how to handle that (and where else this may be occuring)
  const teams = await tryTbaRequest(`/event/${process.env.REGIONAL_CODE}/teams/simple`).catch(e => console.error(e));
  if (teams) {
    await client.request(`
      mutation($year: Int!, $code: String!, $teams: [Int!]!) {
        upsertTBACompetitionData(gameYear: $year, regionalCode: $code, teamNumbers: $teams) { code }
      }
    `, { year: 2018, code: process.env.REGIONAL_CODE, teams: teams.map(team => team.team_number) });
  }
  
  const rankings = await tryTbaRequest(`/event/${process.env.REGIONAL_CODE}/rankings`).catch(e => console.error(e));
  
  if (rankings) {
    for (const team of rankings.rankings) {
      
      await saveTeamData('Disqualifications', 'NUMBER', team.dq, team.team_key);
      await saveTeamData('Matches Played', 'NUMBER', team.matches_played, team.team_key);
      await saveTeamData('Rank', 'NUMBER', team.rank, team.team_key);
      await saveTeamData('Win-Loss-Tie', 'TEXT', `${team.record.wins}-${team.record.losses}-${team.record.ties}`, team.team_key);

      for (const [idx, val] of team.extra_stats.entries()) {
        await saveTeamData(rankings.extra_stats_info[idx].name, 'NUMBER', val, team.team_key);
      }

      for (const [idx, val] of team.sort_orders.entries()) {
        try {
          // For some reason there's an extra element in sort_orders that isn't in sort_order_info...?
          await saveTeamData('TBA: ' + rankings.sort_order_info[idx].name, 'NUMBER', val, team.team_key);
        } catch(e) {}
      }
    }
  }
  
  const oprs = await tryTbaRequest(`/event/${process.env.REGIONAL_CODE}/oprs`).catch(e => console.error(e));
  
  if (oprs) {
    for (const [team, val] of Object.entries(oprs.ccwms)) {
      await saveTeamData('CCWM', 'NUMBER', val, team);
    }
    
    for (const [team, val] of Object.entries(oprs.dprs)) {
      await saveTeamData('DPR', 'NUMBER', val, team);
    }
    
    for (const [team, val] of Object.entries(oprs.oprs)) {
      await saveTeamData('OPR', 'NUMBER', val, team);
    }
  }
  
  console.log('Team info updated from API');
}

async function updateMatches() {
  console.log('Updating match info from API...');
  
  await login();
  
  const matches = await tryTbaRequest(`/event/${process.env.REGIONAL_CODE}/matches/simple`).catch(e => console.error(e));
  
  if (matches) {
    for (const match of matches) {
      await client.request(`
          mutation($level: String!, $number: Int!, $code: String!, $blue: [Int!]!, $red: [Int!]!) {
            upsertTBAMatch(gameYear: 2018, regionalCode: $code, level: $level, number: $number,
                        blueNumbers: $blue, redNumbers: $red
                      ) { name }
          }
        `, {
            level: match.comp_level, number: match.match_number, code: process.env.REGIONAL_CODE,
            blue: match.alliances.blue.team_keys.map(team => parseInt(team.substr(3))),
            red: match.alliances.blue.team_keys.map(team => parseInt(team.substr(3)))
          }
      );
    }
  }
  
  console.log('Match info updated from API');
}

const webhookParser = bodyParser.json({
  verify(req, res, buf, encoding) {
    // sha1 content
    var hash = crypto.createHash('sha1');
    hash.update(process.env.TBA_WEBHOOK_SECRET);
    hash.update(buf);
    req.hasha = hash.digest('hex');
  }
});

function webhookHandler(req, res) {
  if (req.headers['x-tba-checksum'] !== req.hasha) {
    console.warn(
`TBA webhook recieved with bad checksum. Message will not be processed.
Calculated: ${req.hasha} Incoming: ${req.headers['X-TBA-Checksum']}`
                );
  } else {
    const data = req.body.message_data;

    switch (req.body.message_type) {
      case 'ping':
        console.info('Recieved ping');
        break;
      case 'verification':
        console.info(
`TBA verification key recieved: ${data.verification_key}
Go to your account overview to complete verification: https://www.thebluealliance.com/account`
                    );
        break;
      case 'schedule_updated':
        if (data.event_key === process.env.REGIONAL_CODE) {
          updateMatches();
        }
        break;
      case 'match_score':
        if (data.match.event_key === process.env.REGIONAL_CODE) {
          updateTeams();
        }
    }
  }
  
  res.send('Recieved');
}

module.exports = {
  updateTeams,
  updateMatches,
  webhookParser,
  webhookHandler,
}
