"use strict"; /** notification service */
const { createCoreService } = require("@strapi/strapi").factories;
const noteEty = "api::notification.notification";

module.exports = createCoreService(noteEty, ({ strapi }) => ({
  async notify(user, type, meta) {
    return strapi.service(noteEty).create({ data: { user, type, meta } }).catch(console.log);
  },
  async deleteNotificationByUser(userId) {
    const notes = await strapi.query(noteEty).findMany({ select: ["id"], where: { user: { id: userId } } });
    if (!notes[0]) return;

    await Promise.all(notes.map(({ id }) => strapi.query(noteEty).delete({ where: { id } })));
    return this.deleteNotificationByUser(userId);
  },
}));
