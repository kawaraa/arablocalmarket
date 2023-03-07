module.exports = ({ env }) => ({
  upload: {
    config: {
      sizeLimit: 50 * 1024 * 1024, // 256mb in bytes
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
        defaultFrom: "noreply@recipee.com",
        defaultReplyTo: "noreply@recipee.com",
      },
    },
  },
});
