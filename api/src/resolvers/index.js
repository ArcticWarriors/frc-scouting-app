const { scout } = require('./Query/scout');
const { auth } = require('./Mutation/auth');
const { AuthPayload } = require('./AuthPayload');

module.exports = {
  Query: {
    ...scout,
  },
  Mutation: {
    ...auth,
  },
  AuthPayload,
};
