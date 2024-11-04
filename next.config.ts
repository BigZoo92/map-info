import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ['exemple.com'], // Remplace 'exemple.com' par le domaine de ton image
  },
}

export default nextConfig
