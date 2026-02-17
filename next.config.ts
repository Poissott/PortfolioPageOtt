import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: 'bottom-right',
  },
  turbopack: {
    root: './',
  },
};

export default nextConfig;
