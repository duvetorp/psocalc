/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["sv", "en", "nl"],
    defaultLocale: "sv",
    localeDetection: false,
  },
  async redirects() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
        permanent: true,
      },
    ];
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
