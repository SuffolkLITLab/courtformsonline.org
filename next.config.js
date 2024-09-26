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
      {
        source: '/(.*)/slack_archive/(.*).html',
        destination:
          'https://assemblyline.suffolklitlab.org/docs/get_started#join-the-community',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
