'use client';

import dynamic from 'next/dynamic';

export const LazyTooltip = dynamic(
  () =>
    import('@/components/ui/tooltip').then(mod => ({
      default: mod.Tooltip,
    })),
  {
    ssr: false,
  },
);

export const LazyTooltipTrigger = dynamic(
  () =>
    import('@/components/ui/tooltip').then(mod => ({
      default: mod.TooltipTrigger,
    })),
  {
    ssr: false,
  },
);

export const LazyTooltipContent = dynamic(
  () =>
    import('@/components/ui/tooltip').then(mod => ({
      default: mod.TooltipContent,
    })),
  {
    ssr: false,
  },
);

export const LazyTooltipProvider = dynamic(
  () =>
    import('@/components/ui/tooltip').then(mod => ({
      default: mod.TooltipProvider,
    })),
  {
    ssr: false,
  },
);
