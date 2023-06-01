"use strict"; /** notification service */
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::notification.notification", ({ strapi }) => ({
  async notify(user, type, meta) {
    return strapi
      .service("api::notification.notification")
      .create({ data: { user, type, meta } })
      .catch(console.log);
  },
}));
