"use strict"; /** rating controller */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::rating.rating", ({ strapi }) => ({
  async create(ctx) {
    if (!ctx.state.user?.id) return ctx.unauthorized();

    ctx.request.body.data.customer = await strapi
      .service("api::customer.customer")
      .getCustomerId(ctx.state.user.id);

    const { stars, ...res } = ctx.request.body.data;

    const rating = await strapi.query("api::rating.rating").findOne({ where: { ...res } });
    if (rating) return strapi.service("api::rating.rating").update(rating.id, { data: { stars } });
    return super.create(ctx);
  },
}));
