module.exports = ({ env }) => ({
  upload: {
    config: {
      sizeLimit: 50 * 1024 * 1024, // 256mb in bytes
      provider: "@strapi-community/strapi-provider-upload-google-cloud-storage",
      providerOptions: {
        baseUrl: env("GCS_BASE_URL"),
        bucketName: env("GCS_BUCKET_NAME"),
        publicFiles: false,
        uniform: env("GCS_UNIFORM"),
        serviceAccount: env.json("GCS_SERVICE_ACCOUNT"),
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
