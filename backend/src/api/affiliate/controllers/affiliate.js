"use strict"; /** affiliate controller */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::affiliate.affiliate", ({ strapi }) => ({
  async find(ctx) {
    ctx.query.filters = { user: { id: { $eqi: ctx.state.user.id } } };
    delete ctx.query.populate;
    const result = await super.find(ctx);

    const where = { id: { $in: result.data.map((d) => d.attributes.referredItem) } };
    const stores = await strapi.query("api::store.store").findMany({ select: ["id", "name"], where });

    result.data = result.data.map((d) => {
      d.attributes.store = stores.find((s) => s.id == d.attributes.referredItem);
      d.attributes.id = d.id;
      return d.attributes;
    });
    return result;
  },
}));
