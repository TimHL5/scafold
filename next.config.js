/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/content/scafold',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
