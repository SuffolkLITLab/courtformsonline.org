/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/courtformsonline.org' : '',
  assetPrefix: isProd ? '/courtformsonline.org' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
