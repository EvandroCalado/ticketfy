'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SpeedInsights = dynamic(
  () =>
    import('@vercel/speed-insights/next').then(mod => ({
      default: mod.SpeedInsights,
    })),
  {
    ssr: false,
    loading: () => null,
  },
);

export const LazySpeedInsights = () => {
  // Only load in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <SpeedInsights />
    </Suspense>
  );
};
