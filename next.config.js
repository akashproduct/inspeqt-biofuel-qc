/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/inspeqt-biofuel-qc',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = nextConfig 