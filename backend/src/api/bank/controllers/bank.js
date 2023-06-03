"use strict"; /** bank controller */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::bank.bank", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user.id;
    const bank = await strapi.query("api::bank.bank").findOne({ where: { user } });
    if (bank) return ctx.badRequest();
    ctx.request.body.data.user = user;
    const { id, attributes } = (await super.create(ctx)).data;
    const bankAccount = `${id}:${attributes.accountHolder} ***${attributes.iban.slice(-4)}`;
    await strapi.query("api::bank.bank").update({ where: { id }, data: { user } });
    await strapi
      .query("plugin::users-permissions.user")
      .update({ where: { id: user }, data: { bankAccount } });

    return { bankName: bankAccount };
  },

  async delete(ctx) {
    const user = ctx.state.user.id;
    const bankId = ctx.params.id;
    const bank = await strapi.query("api::bank.bank").findOne({ where: { user } });
    if (bank?.id && bank.id != bankId) return ctx.unauthorized();
    await super.delete(ctx);
    await strapi
      .query("plugin::users-permissions.user")
      .update({ where: { id: user }, data: { bankAccount: null } });

    return { success: true };
  },
}));
