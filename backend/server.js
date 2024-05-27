const strapi = require("@strapi/strapi");

strapi(/* {...} */).start();

console.log(`Started server in ${process.env.NODE_ENV || "development"} mode`);
