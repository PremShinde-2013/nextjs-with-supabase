import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all domains (development use only)
      },
    ],
    // OR for specific allowed domains:
    // domains: [
    //   "your-project.supabase.co",
    //   "cdn.yoursite.com",
    //   "images.unsplash.com",
    // ],
  },
};

export default nextConfig;
