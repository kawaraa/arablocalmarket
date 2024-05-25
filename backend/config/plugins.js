module.exports = ({ env }) => ({
  upload: {
    config: {
      // sizeLimit: 50 * 1024 * 1024, // 256mb in bytes, The default is 200MB
      provider: "@strapi-community/strapi-provider-upload-google-cloud-storage",
      providerOptions: {
        baseUrl: env("GCP_BASE_URL") + env("GCP_BUCKET_NAME"),
        bucketName: env("GCP_BUCKET_NAME"),
        publicFiles: false,
        uniform: env("GCP_UNIFORM"),
        serviceAccount: env.json("GCP_SERVICE_ACCOUNT"),
        basePath: "/",
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        service: "gmail",
        auth: { user: env("NODEMAILER_USER"), pass: env("NODEMAILER_PASS") },
      },
      settings: {
        defaultFrom: "noreply@arablocalmarket.com",
        defaultReplyTo: "info@arablocalmarket.com",
      },
    },
  },
});
