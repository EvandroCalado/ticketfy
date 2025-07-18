import type { NextConfig } from 'next';

import bundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
