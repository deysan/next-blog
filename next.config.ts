import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}`,
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tags",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
