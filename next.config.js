/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/inspeqt-biofuel-qc',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/inspeqt-biofuel-qc/',
  transpilePackages: ['react-leaflet'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    return config
  }
}

module.exports = nextConfig 