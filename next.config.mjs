import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  transpilePackages: ['framer-motion', 'lucide-react', 'gsap'],
  images: {
    unoptimized: true
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Use in-memory cache during development to prevent OneDrive file lock conflicts on .pack.gz files
      config.cache = {
        type: 'memory'
      };
    }
    return config;
  }
};

export default nextConfig;
