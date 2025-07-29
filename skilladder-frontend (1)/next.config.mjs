/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google profile images
      'api.dicebear.com', // Avatar generator
    ],
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['next-auth'],
  },
}

export default nextConfig
