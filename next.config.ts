import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ijviarfucnpjakjknzzs.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // ✅ NOTE: Turbopack debug logs are development-only and automatically
  // removed in production. They don't affect functionality or performance.
  // The verbose logging is normal Turbopack behavior and helps with debugging.
  // No configuration needed - logs are automatically suppressed in production builds.
};

export default nextConfig;
