import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Allows quality={100} on the header logo (public/logo-1.png) so it's
    // re-encoded with as little compression loss as the source allows.
    qualities: [75, 100],
  },
};

export default nextConfig;
