import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@cloth/shared-types"],
};

export default nextConfig;
