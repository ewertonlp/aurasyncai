/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify removido - é padrão em Next.js 16+
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-supabase-project.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig