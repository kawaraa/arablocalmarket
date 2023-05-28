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

  plugin.controllers.user.destroy = async (ctx) => {
    const userId = ctx.state.user?.id;
    if (!userId) return (ctx.response.status = 403);

    const options = { where: { user: userId }, select: ["id"] };
    const id = (await strapi.db.query("api::customer.customer").findOne(options)).id;
    const { results } = await strapi.service("api::store.store").find({ where: { owner: userId } });

    const promises = [strapi.query("api::rating.rating").delete({ where: { customer: id } })];

    results.forEach((s) => {
      promises.push(strapi.query("api::order.order").deleteMany({ data: { where: { store: s.id } } }));
      promises.push(strapi.query("api::product.product").deleteMany({ where: { storeId: s.id } }));
    });
    promises.push(strapi.query("api::store.store").deleteMany({ data: { where: { owner: userId } } }));
    promises.push(strapi.query("api::customer.customer").delete({ where: { id } }));
    // Todo: Cancel all the subscription.
    // Todo: Delete the customer from Stripe.

    // promises.push(strapi.service("api::stripe.stripe").CancelSubscriptions(""));
    // promises.push(strapi.service("api::stripe.stripe").deleteCustomer(ctx.state.user.strapiId));

    await Promise.all(promises);
    return strapi.query("plugin::users-permissions.user").delete({ where: { id: userId } });
  };

  return plugin;
};
