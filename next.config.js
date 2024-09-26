/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/forms/(.*).pdf',
        destination: '/forms',
        permanent: true,
      },
      {
        source: '/pdfs/(.*).pdf',
        destination: '/forms',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
