import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Write build output to ./build instead of the locked .next folder
  distDir: "build",
};

export default nextConfig;
