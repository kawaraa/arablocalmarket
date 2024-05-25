const cronTasks = require("../src/cron/all-tasks");

module.exports = ({ env }) => ({
  host: env("HOST"),
  port: env.int("PORT"),
  app: { keys: env.array("APP_KEYS") },
  url: env("PUbLIC_URL"),
  cron: { enabled: true, tasks: cronTasks },
});
