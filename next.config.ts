import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // JSON in /content is imported at build time; no runtime GitHub token on the client.
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
