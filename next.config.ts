import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/careers", destination: "/career", permanent: true },
      { source: "/team", destination: "/about", permanent: false },
      { source: "/get-started", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;
