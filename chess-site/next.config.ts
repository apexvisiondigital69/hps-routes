import type { NextConfig } from "next";
import path from "node:path";

// When building for GitHub Pages we need a static export and a basePath
// matching the repo name. Locally / on Vercel these stay off.
const isPages = process.env.DEPLOY_TARGET === "pages";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  ...(isPages
    ? {
        output: "export",
        basePath: "/hps-routes",
        assetPrefix: "/hps-routes/",
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
