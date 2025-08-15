'use client';

import dynamic from 'next/dynamic';

export const LazySelect = dynamic(
  () =>
    import('@/components/ui/select').then(mod => ({
      default: mod.Select,
    })),
  {
    ssr: false,
  },
);

export const LazySelectContent = dynamic(
  () =>
    import('@/components/ui/select').then(mod => ({
      default: mod.SelectContent,
    })),
  {
    ssr: false,
  },
);

export const LazySelectItem = dynamic(
  () =>
    import('@/components/ui/select').then(mod => ({
      default: mod.SelectItem,
    })),
  {
    ssr: false,
  },
);

export const LazySelectTrigger = dynamic(
  () =>
    import('@/components/ui/select').then(mod => ({
      default: mod.SelectTrigger,
    })),
  {
    ssr: false,
  },
);

export const LazySelectValue = dynamic(
  () =>
    import('@/components/ui/select').then(mod => ({
      default: mod.SelectValue,
    })),
  {
    ssr: false,
  },
);
