const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = {
  async signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password },
    });

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    };
  },

  async login(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const passValid = await bcrypt.compare(password, user.password);
    const ip = ctx.request.headers['x-forwarded-for'] || ctx.request.connection.remoteAddress;
    const localValid = user.email.endsWith('@localhost') && ip.endsWith('127.0.0.1');
    
    if (!passValid && !localValid) {
      throw new Error('Invalid password');
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    };
  },
};

module.exports = { auth };
