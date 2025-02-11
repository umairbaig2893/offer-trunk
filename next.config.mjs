/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.offertrunk.com", "www.offertrunk.com"], // Added "via.placeholder.com"
  },
};

export default nextConfig;
