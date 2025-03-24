/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.offertrunk.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.offertrunk.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mir-s3-cdn-cf.behance.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'maxbounty.com',
        port: '',
        pathname: '/**',
      },
      // Example of using a wildcard for subdomains under offertrunk.com:
      {
        protocol: 'https',
        hostname: '*.offertrunk.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

export default nextConfig;

// import bundleAnalyzer from "@next/bundle-analyzer";

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   images: {
//     domains: ["api.offertrunk.com", "www.offertrunk.com"],
//     formats: ["image/avif", "image/webp"],
//   },

//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = { fs: false };
//     }
//     return config;
//   },

//   async rewrites() {
//     return [
//       {
//         source: "/sitemap.xml",
//         destination: "/api/sitemap",
//       },
//     ];
//   },

//   experimental: {
//     appDir: true,
//   },

//   poweredByHeader: false,
//   compress: true,
//   swcMinify: true,
// };

// export default withBundleAnalyzer(nextConfig);
