'use client';

import dynamic from 'next/dynamic';

const Toaster = dynamic(
  () =>
    import('@/components/ui/sonner').then(mod => ({ default: mod.Toaster })),
  {
    ssr: false,
  },
);

export const LazyToaster = () => {
  return <Toaster position='top-right' richColors />;
};
