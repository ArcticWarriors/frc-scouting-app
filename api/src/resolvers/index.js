const { scout } = require('./Query/scout');
const { tbaq } = require('./Query/tba');
const { tbam } = require('./Mutation/tba');
const { auth } = require('./Mutation/auth');
const { AuthPayload } = require('./AuthPayload');

module.exports = {
  Query: {
    ...scout,
    ...tbaq,
  },
  Mutation: {
    ...auth,
    ...tbam,
  },
  AuthPayload,
};
