"use strict";

/**
 * customer service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::customer.customer", ({ strapi }) => ({
  async getCustomerId(user) {
    return (await strapi.query("api::customer.customer").findOne({ where: { user }, select: ["id"] }))?.id;
  },
}));
