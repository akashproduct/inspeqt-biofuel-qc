/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: '/inspeqt-biofuel-qc', // Replace with your repository name
  images: {
    unoptimized: true,
  },
  transpilePackages: ['react-leaflet'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    return config
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig 