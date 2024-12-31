import type { NextConfig } from 'next';
import withPlaiceholder from '@plaiceholder/next';

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/photos/**',
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
