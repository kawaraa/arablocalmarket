"use strict"; /** customer controller */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::customer.customer", ({ strapi }) => ({
  async find(ctx) {
    if (!ctx.state.user) return ctx.unauthorized();
    let { data, meta } = await super.find(ctx);
    data.forEach((d) => {
      d.attributes.workStores.data.forEach((s) => {
        s.attributes = strapi
          .service("api::store.store")
          .removePrivateFields(ctx.state?.user?.id, s.attributes);
      });
    });

    return { data, meta };
  },

  //   async create(ctx) {
  //     // Todo: ctx.request.body.data.user = ctx.state.user.id
  //   },
  //   async findOne(ctx) {
  //    // Todo: find the favorite by ctx.state.user.id and return {id, stores:[id,id], products:[id,id]}
  //   },
  //   async update(ctx) {
  //    // Todo:  Get favorite where user = ctx.state.user.id
  //    // then add this ctx.body.data:{item:"store", id:""}
  //   // then update the favorite
  //   },
  //   async delete(ctx) {
  //     // Todo: Get favorite where user = ctx.state.user.id
  //   // then filter the stores and products that do not contain id in ctx.params.id
  //   // then update the favorite
  //   },
}));
