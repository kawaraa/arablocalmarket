module.exports = [
  "strapi::errors",
  // "strapi::security",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "storage.googleapis.com"],
          "media-src": ["'self'", "data:", "blob:", "storage.googleapis.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  // 'strapi::body',
  {
    name: "strapi::body",
    config: {
      formLimit: "50mb", // modify form body
      jsonLimit: "50mb", // modify JSON body
      textLimit: "50mb", // modify text body
      formidable: {
        maxFileSize: 50 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
];
