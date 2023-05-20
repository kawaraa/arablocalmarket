// Todo: add PUT method to users/me route to let the user update certain information, E.g. name, address but not email of password
// https://docs.strapi.io/dev-docs/backend-customization#core-services
// https://forum.strapi.io/t/users-me-update/15187
// https://www.youtube.com/watch?v=2ZwiiY6tnmw

module.exports = (plugin) => {
  //   /*******************************  CUSTOM CONTROLERS  ********************************/
  console.log(plugin.controllers.user);
  plugin.controllers.user.update = async (ctx) => {
    console.log("AAAA");
    // return {};
  };

  //   plugin.controllers.user.updateMe = async (ctx) => {
  //     console.log("User: >>> ", ctx.state.user);
  //     console.log("Data: >>> ", ctx.request.body);
  //     if (!ctx.state.user || ctx.state.user.id) {
  //       // ctx.badRequest('forbidden to update other user')
  //       return (ctx.response.status = 403);
  //     }
  //     await strapi
  //       .query("plugin::users-permissions.user")
  //       .update({
  //         where: { id: ctx.state.user.id },
  //         data: ctx.request.body,
  //       })
  //       .then((res) => {
  //         ctx.response.status = 200;
  //       });
  //   };

  //   /*******************************  CUSTOM ROUTES  ********************************/
  //   //   plugin.routes["content-api"].routes.push({
  //   //     method: "PUT",
  //   //     path: "/users/me",
  //   //     handler: "user.updateMe",
  //   //     config: {
  //   //       prefix: "",
  //   //       policies: [],
  //   //     },
  //   //   });

  return plugin;
};
