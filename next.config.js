/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization configuration
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable compression
  compress: true,

  // Enable strict React mode in development
  reactStrictMode: true,

  // PoweredBy header removal for security
  poweredByHeader: false,

  // Generate ETags for static content
  generateEtags: true,

  // Production source maps disabled by default for security
  productionBrowserSourceMaps: false,

  // Allow build to continue with ESLint warnings
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["app", "components", "hooks", "utils", "config"],
  },
};

export default nextConfig;

