/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cibul.s3.amazonaws.com', 'res.cloudinary.com/'],
  },
};

module.exports = nextConfig;
