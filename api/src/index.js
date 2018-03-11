const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const resolvers = require('./resolvers');

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
      debug: process.env.NODE_ENV === 'dev',
    }),
  }),
});

server.start(() => console.log('Server is running on http://localhost:4000'));
