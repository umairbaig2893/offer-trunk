/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.offertrunk.com", "via.placeholder.com"], // Added "via.placeholder.com"
  },
};

export default nextConfig;
