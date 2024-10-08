import createMDX from '@next/mdx';
import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
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

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

const withMDXConfig = withMDX(nextConfig);

export default withPlaiceholder(withMDXConfig);
