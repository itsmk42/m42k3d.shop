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
  // ✅ FIX: Suppress Turbopack debug logs in development
  // This removes verbose Turbopack module loading logs from browser console
  // while keeping actual errors visible. Logs are automatically removed in production.
  experimental: {
    turbopack: {
      // Only show errors, not debug logs
      logLevel: 'error',
    },
  },
};

export default nextConfig;
