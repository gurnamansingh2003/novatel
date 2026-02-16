import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Iska matlab Cloudinary ke saare paths allow hain
      },
    ],
  },
};

export default nextConfig;