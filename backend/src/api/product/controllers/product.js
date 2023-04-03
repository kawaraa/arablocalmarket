"use strict"; /** product controller */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async create(ctx) {
    const owner = await strapi.service("api::store.store").checkStoreOwner(ctx);
    if (!owner) return ctx.unauthorized();

    return super.create(ctx);
  },

  async update(ctx) {
    const owner = await strapi.service("api::store.store").checkStoreOwner(ctx);
    if (!owner) return ctx.unauthorized();

    if (ctx.request.files) {
      const options = { where: { id: ctx.params.id }, populate: ["image"] };
      const p = await strapi.db.query("api::product.product").findOne(options);
      if (p.image) strapi.plugins.upload.services.upload.remove(p.image);
    }

    return super.update(ctx);
  },

  async delete(ctx) {
    const owner = await strapi.service("api::store.store").checkStoreOwner(ctx);
    if (!owner) return ctx.unauthorized();
    return super.delete(ctx);
  },
}));
