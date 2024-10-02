/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      // Form Explorer PDFs
      {
        source: '/forms/:slug([a-zA-Z\\d]*.pdf)',
        destination: 'https://formexplorer.suffolklitlab.org/forms/:slug',
        basePath: false,
        permanent: true,
      },
      // Form Explorer CSV
      {
        source: '/forms/form_data.csv',
        destination:
          'https://formexplorer.suffolklitlab.org/forms/form_data.csv',
        basePath: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
