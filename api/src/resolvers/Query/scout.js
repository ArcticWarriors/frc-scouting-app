const { getUserId } = require('../../utils');

const scout = {
  me(parent, args, ctx, info) {
    const id = getUserId(ctx, true);
    if (id === null) return null;
    console.log(info);
    return ctx.db.query.user({ where: { id } }, info);
  },
};

module.exports = { scout };
