/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  eslist: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
