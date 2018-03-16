const { limitUser } = require('../../utils');

const tbaq = {
  async tbaUpdateRecord(parent, args, ctx, info) {
    //await limitUser(ctx, 'tba-api@localhost');
    
    return ctx.db.query.tBAUpdateRecord({where: { endpoint: args.endpoint }});
  },
};

module.exports = { tbaq };