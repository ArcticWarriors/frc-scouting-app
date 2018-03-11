const jwt = require('jsonwebtoken');

class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

function getUserId(ctx, nullable) {
  const Authorization = ctx.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }
  if (nullable) return null;
  throw new AuthError();
}

module.exports = {
  getUserId,
  AuthError,
};
