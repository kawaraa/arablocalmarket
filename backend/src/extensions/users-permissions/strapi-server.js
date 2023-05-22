const mutableFields = ["firstName", "lastName", "username", "phone", "address"];

module.exports = (plugin) => {
  //   /*******************************  CUSTOM CONTROLERS  ********************************/
  plugin.controllers.user.update = async (ctx) => {
    const userId = ctx.state.user?.id;
    if (!userId) return (ctx.response.status = 403); // try ctx.forbidden();
    const data = ctx.request.body;

    const immutableFields = Object.keys(data).filter((k) => !mutableFields.includes(k));
    if (immutableFields[0]) {
      return ctx.badRequest("The following fields are immutable, " + immutableFields.join(", "));
    }

    const res = await strapi.query("plugin::users-permissions.user").update({ where: { id: userId }, data });

    if (data.firstName || data.lastName) {
      const cData = { name: res.firstName + " " + res.lastName };
      await strapi.query("api::customer.customer").update({ where: { user: userId }, data: cData });
    }

    return res;
  };

  // Todo: This need to be tested
  plugin.controllers.user.destroy = async (ctx) => {
    const userId = ctx.state.user?.id;
    if (!userId) return (ctx.response.status = 403);

    const options = { where: { user: userId }, select: ["id"] };
    const id = (await strapi.db.query("api::customer.customer").findOne(options)).id;

    await strapi.query("api::rating.rating").delete({ where: { customer: id } });

    const { results } = await strapi.service("api::store.store").find({ where: { owner: userId } });

    const promises = results.map(async (s) => {
      await strapi.query("api::product.product").deleteMany({ where: { storeId: s.id } });
      await strapi.query("api::order.order").deleteMany({ where: { store: s.id } });
    });
    promises.push(await strapi.query("api::store.store").deleteMany({ where: { owner: userId } }));
    promises.push(await strapi.query("api::customer.customer").delete({ where: { id } }));

    await Promise.all(promises);

    return strapi.query("plugin::users-permissions.user").delete({ where: { id: userId } });
  };

  return plugin;
};
