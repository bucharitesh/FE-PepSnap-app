/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ['flam-videoshop-assets.s3.ap-south-1.amazonaws.com', 'saas-assets.flamapp.com'],
  },
  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  trailingSlash: false,
  reactStrictMode: false,
  output: 'standalone',
});
