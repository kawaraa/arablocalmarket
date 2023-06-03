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
    const user = ctx.state.user;
    if (!user) return (ctx.response.status = 403);

    const promises = [strapi.service("api::rating.rating").deleteRatingsByUser(user.id)];

    const options = { where: { owner: user.id }, populate: "*" };
    (await strapi.service("api::store.store").find(options)).results.forEach((s) => {
      promises.push(strapi.service("api::store.store").deleteStoreAndItsProducts(s.id, store));
    });

    promises.push(strapi.query("api::customer.customer").delete({ where: { user: user.id } }));
    promises.push(strapi.service("api::stripe.stripe").deleteCustomer(user.stripeId));
    promises.push(strapi.service("api::notification.notification").deleteNotificationByUser(user.id));

    await Promise.all(promises);
    return strapi.query("plugin::users-permissions.user").delete({ where: { id: user.id } });
  };

  return plugin;
};
