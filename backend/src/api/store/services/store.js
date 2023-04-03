"use strict"; /** store service */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::store.store", ({ strapi }) => ({
  async checkStoreOwner(ctx, storeId) {
    let id = storeId || ctx.request.body?.data?.storeId;
    if (!id) id = JSON.parse(ctx.request.body?.data)?.storeId;
    const options = { select: ["id"], where: { id, owner: ctx.state.user.id } };
    const store = await strapi.db.query("api::store.store").findOne(options);
    return store?.id == id;
  },
}));
