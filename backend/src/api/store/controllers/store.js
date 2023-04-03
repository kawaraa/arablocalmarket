"use strict"; /** store controller */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::store.store", ({ strapi }) => ({
  async create(ctx) {
    const { data, meta } = await super.create(ctx);
    await strapi.service("api::store.store").update(data.id, { data: { owner: ctx.state.user.id } });
    return { data, meta };
  },

  async findOne(ctx) {
    const result = await super.findOne(ctx);
    if (!result) ctx.notFound();
    let owner = false;

    if (ctx.state.user) {
      const options = { select: ["id"], where: { owner: ctx.state.user.id } };
      owner = (await strapi.db.query("api::store.store").findOne(options))?.id ? true : false;
    }

    if (!owner) {
      delete result.data.attributes.cocNumber;
      delete result.data.attributes.vatNumber;
    }

    result.data.attributes.ratings = getStars(result.data.attributes.ratings);
    return result;
  },

  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    const getStars = strapi.service("api::store.store").calculateStars;

    data.forEach((s) => {
      delete s.attributes.cocNumber;
      delete s.attributes.vatNumber;
      s.attributes.ratings = getStars(s.attributes.ratings);
    });
    return { data, meta };
  },

  async update(ctx) {
    const id = ctx.params.id;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id }, populate: ["cover"] };

    const store = await strapi.db.query("api::store.store").findOne(options);
    if (store?.id != id) return ctx.unauthorized();
    if (ctx.request.files && store.cover) strapi.plugins.upload.services.upload.remove(store.cover);

    return super.update(ctx);
  },

  async delete(ctx) {
    const id = ctx.params.id;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id } };

    const store = await strapi.db.query("api::store.store").findOne(options);
    if (store?.id != id) return ctx.unauthorized();

    return super.delete(ctx);
  },
}));
