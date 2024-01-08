/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      {
        protocol: 'https',
        hostname: 'pizza-ordering-web-app.s3.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
