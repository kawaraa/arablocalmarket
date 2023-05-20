const mutableFields = ["firstName", "lastName", "username", "phone", "address"];

module.exports = (plugin) => {
  //   /*******************************  CUSTOM CONTROLERS  ********************************/
  plugin.controllers.user.update = async (ctx) => {
    const userId = ctx.state.user?.id;
    if (!userId) return (ctx.response.status = 403);
    const data = ctx.request.body;

    const immutableFields = Object.keys(data).filter((k) => !mutableFields.includes(k));
    if (immutableFields[0]) {
      return ctx.badRequest("The following fields are immutable, " + immutableFields.join(", "));
    }

    return strapi.query("plugin::users-permissions.user").update({ where: { id: userId }, data });
  };

  plugin.controllers.user.destroy = async (ctx) => {
    const userId = ctx.state.user?.id;
    if (!userId) return (ctx.response.status = 403);

    const options = { where: { user: userId }, select: ["id"] };
    const id = (await strapi.db.query("api::customer.customer").findOne(options)).id;

    await strapi.service("api::customer.customer").update(id, { data: { cart: [] } });
    await strapi.query("api::rating.rating").delete({ where: { customer: id } });

    const { results } = await strapi.service("api::store.store").find({ where: { owner: userId } });
    await Promise.all(
      results.map((s) => strapi.query("api::product.product").deleteMany({ where: { storeId: s.id } }))
    );

    await strapi.query("api::store.store").deleteMany({ where: { owner: userId } });
    return strapi.query("plugin::users-permissions.user").delete({ where: { id: userId } });
  };

  return plugin;
};
