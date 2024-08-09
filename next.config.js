/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cibul.s3.amazonaws.com', 'localhost:3001'],
  },
};

module.exports = nextConfig;
