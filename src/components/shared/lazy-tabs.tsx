'use client';

import dynamic from 'next/dynamic';

export const LazyTabs = dynamic(
  () =>
    import('@/components/ui/tabs').then(mod => ({
      default: mod.Tabs,
    })),
  {
    ssr: false,
  },
);

export const LazyTabsList = dynamic(
  () =>
    import('@/components/ui/tabs').then(mod => ({
      default: mod.TabsList,
    })),
  {
    ssr: false,
  },
);

export const LazyTabsTrigger = dynamic(
  () =>
    import('@/components/ui/tabs').then(mod => ({
      default: mod.TabsTrigger,
    })),
  {
    ssr: false,
  },
);

export const LazyTabsContent = dynamic(
  () =>
    import('@/components/ui/tabs').then(mod => ({
      default: mod.TabsContent,
    })),
  {
    ssr: false,
  },
);
