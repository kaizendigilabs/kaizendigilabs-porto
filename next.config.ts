import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "djqltmlgiabwsbqbbyfy.supabase.co",
      },
    ],
  },
};

export default nextConfig;
