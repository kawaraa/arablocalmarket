"use strict"; /** product controller */
const { createCoreController } = require("@strapi/strapi").factories;
const proEty = "api::product.product";
const storeEty = "api::store.store";

module.exports = createCoreController(proEty, ({ strapi }) => ({
  async create(ctx) {
    const owner = await strapi.service(storeEty).checkStoreOwner(ctx);
    if (!owner) return ctx.unauthorized();

    return super.create(ctx);
  },

  async findOne(ctx) {
    const result = await super.findOne(ctx);

    if (result.data.attributes.ratings?.data) {
      result.data.attributes.ratings = strapi
        .service(storeEty)
        .calculateStars(result.data.attributes.ratings.data);

      if (ctx.state.user?.id) {
        const rating = await strapi.query("api::rating.rating").findOne({
          where: { customer: { user: ctx.state.user.id }, product: result.data.id },
        });
        if (rating?.stars) result.data.attributes.ratings.userStars = rating.stars;
      }
    }

    return result;
  },

  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    if (!data || !data[0]) return { data, meta };

    if (data[0].attributes.ratings?.data) {
      data.forEach((p) => {
        if (!p.attributes.ratings.data[0]) return (p.attributes.ratings = []);
        p.attributes.ratings = strapi.service(storeEty).calculateStars(p.attributes.ratings.data);
      });
    }
    return { data, meta };
  },

  async update(ctx) {
    const owner = await strapi.service(storeEty).checkStoreOwner(ctx);
    if (!owner) return ctx.unauthorized();

    if (ctx.request.files) {
      const options = { where: { id: ctx.params.id }, populate: ["image"] };
      const p = await strapi.db.query(proEty).findOne(options);
      if (p.image) await strapi.plugins.upload.services.upload.remove(p.image);
    }

    return super.update(ctx);
  },

  async delete(ctx) {
    const id = ctx.params.id;
    const storeId = +ctx.query.storeId;

    const owner = await strapi.service(storeEty).checkStoreOwner(ctx, storeId);
    if (!owner) return ctx.unauthorized();

    const res = await strapi.service(proEty).deleteProductWithMediaFiles(id);
    if (!res) return ctx.badRequest();
    return res;
  },
}));
