const mutableFields = ["firstName", "lastName", "username", "phone", "address"];

module.exports = (plugin) => {
  //   /*******************************  CUSTOM CONTROLERS  ********************************/
  plugin.controllers.user.update = async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) return (ctx.response.status = 403);
    const data = ctx.request.body;

    const immutableFields = Object.keys(data).filter((k) => !mutableFields.includes(k));
    if (immutableFields[0]) {
      return ctx.badRequest("The following fields are immutable, " + immutableFields.join(", "));
    }

    return strapi.query("plugin::users-permissions.user").update({ where: { id: ctx.state.user.id }, data });
  };

  return plugin;
};
