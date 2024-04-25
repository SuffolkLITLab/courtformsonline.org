/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/courtformsonline.org' : '',
  assetPrefix: isProd ? '/courtformsonline.org' : '',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        // This will match anything after /api/ and proxy it to your backend server
        source: '/api/:path*', // Matches all API requests
        destination: 'https://apps.suffolklitlab.org/:path*', // Proxy to Backend, maintaining the path and query
      },
    ];
  },
};

module.exports = nextConfig;
