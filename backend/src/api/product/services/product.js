"use strict"; /** product service */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::product.product", ({ strapi }) => ({
  async deleteProductWithMediaFiles(id) {
    const options = { select: ["id"], where: { id }, populate: ["image"] };
    const product = await strapi.query("api::product.product").findOne(options);

    if (!product || !product.id) return null;
    if (product.image) await strapi.plugins.upload.services.upload.remove(product.image);

    return strapi.query("api::product.product").delete({ where: { id } });
  },

  async deleteStoreProductsWithMediaFiles(storeId) {
    const options = { select: ["id"], where: { storeId }, populate: ["image"] };
    const results = await strapi.query("api::product.product").findMany(options);
    if (!results[0]) return;

    await Promise.all(
      results.map(async ({ id, image }) => {
        if (image) await strapi.plugins.upload.services.upload.remove(image);
        return strapi.query("api::product.product").delete({ where: { id } });
      })
    );

    return this.deleteStoreProductsWithMediaFiles(storeId);
  },
}));
