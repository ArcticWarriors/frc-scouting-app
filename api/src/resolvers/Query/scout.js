const { getUserId, Context } = require('../../utils');

const scout = {
  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    console.log(info);
    return ctx.db.query.user({ where: { id } }, info)
  }
}

module.exports = { scout }