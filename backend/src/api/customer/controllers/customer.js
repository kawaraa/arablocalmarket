"use strict"; /** customer controller */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::customer.customer", ({ strapi }) => ({
  async create(ctx) {
    const id = ctx.request.body.data.customer?.id;
    ctx.request.body.data.user = ctx.state.user.id + "";
    ctx.request.body.data.name = ctx.state.user.firstName + " " + ctx.state.user.lastName;
    if (!id) return super.create(ctx);

    delete ctx.request.body.data.customer;
    return strapi.service("api::customer.customer").update(id, ctx.request.body);
  },

  async findOne(ctx) {
    const user = ctx.state.user;
    if (!user?.id) return ctx.unauthorized();

    ctx.params.id = await strapi.service("api::customer.customer").getCustomerId(user.id);
    if (!ctx.params.id) {
      ctx.params.id = await strapi
        .service("api::customer.customer")
        .create({ data: { user: user.id, name: user.firstName + " " + user.lastName } });
    }

    let { data, meta } = await super.findOne(ctx);
    if (!data) return { data, meta };

    data.attributes.workStores?.data?.forEach((s) => {
      s.attributes = strapi.service("api::store.store").removePrivateFields(user.id, s.attributes);
    });

    if (data.attributes.favoriteStores?.data[0]) {
      data.attributes.favoriteStores.data = data.attributes.favoriteStores.data.filter((s) =>
        strapi.service("api::store.store").isPublic(s, user.id)
      );
    }

    return { data, meta };
  },

  async find(ctx) {
    let storeId = ctx.query.filters?.orders?.store?.id?.$eqi;
    if (!storeId) storeId = ctx.query.filters?.workStores?.id?.$eqi;
    if (!storeId) return ctx.unauthorized();

    const owner = await strapi.service("api::store.store").checkStoreOwner(ctx, storeId);
    if (!owner) return ctx.unauthorized();

    return super.find(ctx);
  },

  async update(ctx) {
    ctx.params.id = await strapi.service("api::customer.customer").getCustomerId(ctx.state.user.id);

    if (!ctx.params.id) return ctx.unauthorized();
    delete ctx.request.body.data.user;
    delete ctx.request.body.data.name;
    delete ctx.request.body.data.orders;

    return super.update(ctx);
  },
}));
