/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/",
      },
    ];
  },
};

module.exports = nextConfig;
