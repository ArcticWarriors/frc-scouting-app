const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const resolvers = require('./resolvers');
const { updateTeams, updateMatches, webhookParser, webhookHandler } = require('./tba-api');

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      // The endpoint of the Prisma DB service (value is set in .env)
      endpoint: process.env.PRISMA_ENDPOINT,
      // Taken from database/prisma.yml (value is set in .env)
      secret: process.env.PRISMA_SECRET,
      // Log all GraphQL queries & mutations
      // The TBA API updates make this unusable, turn this on by hand if required
      debug: false,
    }),
  }),
});

server.express.use('/tbaupdate', webhookParser);
server.express.post('/tbaupdate', webhookHandler);

server.start(() => {
  console.log(`Server is running on port ${server.options.port}`);
  updateTeams().then( () => updateMatches());
});
