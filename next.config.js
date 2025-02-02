/** @type {import('next').NextConfig} */
const nextConfig = {
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