'use client';

import dynamic from 'next/dynamic';

import { Spinner } from './spinner';

export const LazyAccountPage = dynamic(
  () =>
    import('@/app/(root)/(protected)/account/components/account').then(mod => ({
      default: mod.Account,
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
