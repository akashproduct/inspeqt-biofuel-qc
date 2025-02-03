/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  transpilePackages: ['react-leaflet'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    return config
  },
  trailingSlash: true,  // Add trailing slashes for GitHub Pages compatibility
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig 