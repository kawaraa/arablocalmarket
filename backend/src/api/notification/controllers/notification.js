"use strict"; /** notification controller */
const { createCoreController } = require("@strapi/strapi").factories;
const ety = "api::notification.notification";

module.exports = createCoreController(ety, ({ strapi }) => ({
  async unseen({ state: { user } }) {
    const unseen = await strapi.query(ety).count({ where: { user: user.id, seen: false } });
    return { unseen };
  },
  async find(ctx) {
    const filters = { user: { id: { $eqi: ctx.state.user.id } } };
    if (!ctx.query.filters) ctx.query.filters = filters;
    else ctx.query.filters.user = filters.user;
    return super.find(ctx);
  },
  async update({ params, state: { user }, request: { body } }) {
    await strapi.query(ety).update({ where: { id: +params.id, user: user.id }, data: { seen: body.seen } });
    return { success: true };
  },
  async delete({ params, state: { user } }) {
    await strapi.query(ety).delete({ where: { id: +params.id, user: user.id } });
    return { success: true };
  },
}));
