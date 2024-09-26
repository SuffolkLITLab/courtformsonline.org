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
      {
        source: '/ma/forms/courtformsonline-massaccess',
        destination: '/ma/forms',
        permanent: true,
      },
      {
        source: '/myforms',
        destination: '/forms',
        permanent: true,
      },
      {
        source: '/forms/form_data.csv',
        destination: '/forms',
        permanent: true,
      },
      {
        source: '/hackathon/',
        destination: 'https://suffolklitlab.org/events/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
