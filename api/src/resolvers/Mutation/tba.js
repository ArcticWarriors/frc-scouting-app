const { limitUser } = require('../../utils');

async function upsertAlliancePlacements(ctx, match, teams, color) {
  for (const team of teams) {
    const mpArgs = {
      match: { connect: { name: match } },
      team: { connect: { number: team } },
      alliance: color
    };
    await ctx.db.mutation.createMatchPlacement({ data: mpArgs });
  }
}

const tbam = {
  async upsertTBAUpdateRecord(parent, args, ctx, info) {
    await limitUser(ctx, 'tba-api@localhost');
    
    const urArgs = { ...args }
    return ctx.db.mutation.upsertTBAUpdateRecord({
      where: {endpoint: urArgs.endpoint},
      create: urArgs,
      update: urArgs,
    });
  },
  async upsertTBATeamData(parent, args, ctx, info) {
    limitUser(ctx, 'tba-api@localhost');
    
    const fieldArgs = {
      name: `:n${args.fieldName}:`,
      type: args.type,
      private: false,
      submitter: { connect: { email: 'tba-api@localhost' } },
    }
    await ctx.db.mutation.upsertTeamField({
      where: { name: fieldArgs.name },
      create: fieldArgs,
      update: fieldArgs,
    });
    
    const dataArgs = {
      name: `:t${args.teamNumber}:n${args.fieldName}:`,
      value: args.value,
      private: false,
      owner: { connect: { 
        id: ( await ctx.db.query.scoutTeams({
                where: { members_some: { email: "tba-api@localhost" } } })
            )[0].id,
      } },
      submitter: { connect: { email: 'tba-api@localhost' } }
    }
    return ctx.db.mutation.upsertTeamData({
      where: { name: dataArgs.name },
      create: dataArgs,
      update: dataArgs,
    }, info);
  },
  async upsertTBACompetitionData(parent, args, ctx, info) {
    
    for (const teamNum of args.teamNumbers) {
      const teamArgs = { number: teamNum }
      await ctx.db.mutation.upsertTeam({ where: teamArgs, create: teamArgs, update: teamArgs });
    }
    
    const gameArgs = { year: args.gameYear }
    ctx.db.mutation.upsertGame({ where: gameArgs, create: gameArgs, update: gameArgs });
    
    const compArgs = { code: `:g${args.gameYear}:c${args.regionalCode}:`,
                      teams: { connect: args.teamNumbers.map(num => { return { number: num } }) }
                     }
    return ctx.db.mutation.upsertCompetition({ where: { code: compArgs.code }, create: compArgs, update: compArgs });
  },
  async upsertTBAMatch(parent, args, ctx, info) {
    // gameYear, regionalCode, level, number, blue1Number, blue2Number, blue3Number, red1Number, red2Number, red3Number
    const matchArgs = {
      name: `:g${args.gameYear}:c${args.regionalCode}:l${args.level}:n${args.number}:`,
    }
    await ctx.db.mutation.upsertMatch({ where: matchArgs, create: matchArgs, update: matchArgs });
    
    // THIS IS BROKEN, USE IT WHEN FIXED https://github.com/graphcool/prisma/issues/2039
    //await ctx.db.mutation.deleteManyMatchPlacements({ where: { match: { name: matchArgs.name } } });
    const oldPlacements = ( await ctx.db.query.matchPlacements({ where: { match: { name: matchArgs.name } } }) );
    for (const placement of oldPlacements) {
      await ctx.db.mutation.deleteMatchPlacement({ where: { id: placement.id } });
    }
    await upsertAlliancePlacements(ctx, matchArgs.name, args.blueNumbers, 'BLUE');
    await upsertAlliancePlacements(ctx, matchArgs.name, args.redNumbers, 'RED');
    
    return ctx.db.query.match({ where: { name: matchArgs.name } });
  },
};

module.exports = { tbam };
