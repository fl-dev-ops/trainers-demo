import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return ['meet', 'live', 'removed'].map((route) => ({
      source: `/${route}`,
      destination: `/trainers/olga/${route}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
