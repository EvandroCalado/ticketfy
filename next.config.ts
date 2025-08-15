import type { NextConfig } from 'next';

import bundleAnalyzer from '@next/bundle-analyzer';
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-*',
      'zustand',
      'big.js',
      'clsx',
      'tailwind-merge',
    ],
    optimizeCss: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    config.optimization.concatenateModules = true;

    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 244000, // 244KB max chunk size
      cacheGroups: {
        // Core vendor libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 1,
        },
        // Radix UI components (heavy)
        radix: {
          test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
          name: 'radix',
          chunks: 'all',
          priority: 20,
        },
        // Icons (frequently used)
        lucide: {
          test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
          name: 'lucide',
          chunks: 'all',
          priority: 15,
        },
        // Form utilities
        forms: {
          test: /[\\/]node_modules[\\/](zod|react-hook-form)[\\/]/,
          name: 'forms',
          chunks: 'all',
          priority: 12,
        },
        // Utilities
        utils: {
          test: /[\\/]node_modules[\\/](clsx|tailwind-merge|class-variance-authority|big\.js)[\\/]/,
          name: 'utils',
          chunks: 'all',
          priority: 10,
        },
        // State management
        state: {
          test: /[\\/]node_modules[\\/](zustand|nuqs)[\\/]/,
          name: 'state',
          chunks: 'all',
          priority: 8,
        },
        // Authentication & security
        auth: {
          test: /[\\/]node_modules[\\/](@node-rs\/argon2|@oslojs)[\\/]/,
          name: 'auth',
          chunks: 'all',
          priority: 6,
        },
      },
    };

    return config;
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
