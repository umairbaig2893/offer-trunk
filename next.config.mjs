// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["api.offertrunk.com", "www.offertrunk.com"],
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/sitemap.xml",
//         destination: "/api/sitemap",
//       },
//     ];
//   },
// };

// export default nextConfig;

import bundleAnalyzer from "@next/bundle-analyzer";

/** Enable the bundle analyzer only when ANALYZE=true */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true", // Enables bundle analyzer
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables strict mode for better error handling and debugging

  images: {
    domains: ["api.offertrunk.com", "www.offertrunk.com"], // Allowed domains for next/image optimization
    formats: ["image/avif", "image/webp"], // Enable modern formats for optimized images
  },

  // Custom Webpack configuration for enhanced performance
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side only optimizations
      config.resolve.fallback = { fs: false }; // Prevent bundling Node.js-specific modules
    }
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap", // Rewrite to dynamic sitemap API route
      },
    ];
  },

  experimental: {
    appDir: true, // Enable the new `app` directory structure in Next.js 13+
  },

  poweredByHeader: false, // Hides 'X-Powered-By' header for security
  compress: true, // Enable Brotli and Gzip compression
  swcMinify: true, // Use SWC for fast JavaScript minification
};

// Use `withBundleAnalyzer` to wrap the configuration
export default withBundleAnalyzer(nextConfig);
