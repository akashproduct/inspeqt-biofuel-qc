/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/inspeqt-biofuel-qc',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['react-leaflet'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    return config
  },
  experimental: {
    turbo: {
      rules: {
        // Your custom rules here
      }
    }
  }
}

module.exports = nextConfig 