/** @type {import('next').NextConfig} */

module.exports = {
  experimental: { appDir: true },
  reactStrictMode: true,
  images: {
    domains: ["arablocalmarket.com", "storage.googleapis.com", "localhost"],
  },
};
