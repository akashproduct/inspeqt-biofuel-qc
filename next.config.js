/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/inspeqt-biofuel-qc',
  assetPrefix: '/inspeqt-biofuel-qc/',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig 