'use client';

import dynamic from 'next/dynamic';

import { Spinner } from './spinner';

export const LazyPricePage = dynamic(
  () =>
    import('@/app/(root)/price/components/price-card').then(mod => ({
      default: mod.PriceCard,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='flex min-h-[400px] items-center justify-center'>
        <Spinner />
      </div>
    ),
  },
);
