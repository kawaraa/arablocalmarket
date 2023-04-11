"use strict"; /** product controller */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    if (!data) return { data, meta };

    if (data[0].attributes.ratings?.data) {
      data.forEach((p) => {
        if (!p.attributes.ratings.data[0]) return (p.attributes.ratings = []);
        p.attributes.ratings = strapi
          .service("api::store.store")
          .calculateStars(ctx.state.user?.id, p.attributes.ratings.data);
      });
    }

    return { data, meta };
  },

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
