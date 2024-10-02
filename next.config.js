/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      // Form Explorer PDFs
      {
        source: '/forms/:slug([a-zA-Z\\d]*.pdf)', // https://courtformsonline.org/forms/6b4ebd487f82f387512ac20da28803db.pdf
        destination: 'https://formexplorer.suffolklitlab.org/forms/:slug', // https://s3.amazonaws.com/massaccess.suffolklitlab.org/forms/6b4ebd487f82f387512ac20da28803db.pdf
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
