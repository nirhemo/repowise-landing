/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude native modules from client-side bundling
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle these on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
