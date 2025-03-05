/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 