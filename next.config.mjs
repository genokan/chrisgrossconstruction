/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — deploys as plain files to Cloudflare Pages (or any static host).
  output: "export",
  trailingSlash: true,
  images: {
    // Required for static export: no server-side image optimization.
    unoptimized: true,
  },
};

export default nextConfig;
