/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/dev-psocalc" : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  webpack: (config, { isServer }) => {
    config.cache = false;

    if (!isServer) {
      config.resolve.alias["mini-css-extract-plugin"] = require.resolve(
        "mini-css-extract-plugin"
      );
    }

    return config;
  },
};

module.exports = nextConfig;
