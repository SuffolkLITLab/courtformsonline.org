/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    tsconfigPath: 'tsconfig.build.json',
  },
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

export default nextConfig;
