const jwt = require('jsonwebtoken');

class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  throw new AuthError();
}

async function limitUser(ctx, email) {
  const id = getUserId(ctx);
  const user = await ctx.db.query.user({ where: { id } });
  if (user.email !== email) throw new AuthError();
}

module.exports = {
  AuthError,
  getUserId,
  limitUser,
};
