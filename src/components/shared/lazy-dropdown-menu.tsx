'use client';

import dynamic from 'next/dynamic';

export const LazyDropdownMenu = dynamic(
  () =>
    import('@/components/ui/dropdown-menu').then(mod => ({
      default: mod.DropdownMenu,
    })),
  {
    ssr: false,
  },
);

export const LazyDropdownMenuTrigger = dynamic(
  () =>
    import('@/components/ui/dropdown-menu').then(mod => ({
      default: mod.DropdownMenuTrigger,
    })),
  {
    ssr: false,
  },
);

export const LazyDropdownMenuContent = dynamic(
  () =>
    import('@/components/ui/dropdown-menu').then(mod => ({
      default: mod.DropdownMenuContent,
    })),
  {
    ssr: false,
  },
);

export const LazyDropdownMenuItem = dynamic(
  () =>
    import('@/components/ui/dropdown-menu').then(mod => ({
      default: mod.DropdownMenuItem,
    })),
  {
    ssr: false,
  },
);

export const LazyDropdownMenuSeparator = dynamic(
  () =>
    import('@/components/ui/dropdown-menu').then(mod => ({
      default: mod.DropdownMenuSeparator,
    })),
  {
    ssr: false,
  },
);

export const LazyDropdownMenuLabel = dynamic(
  () =>
    import('@/components/ui/dropdown-menu').then(mod => ({
      default: mod.DropdownMenuLabel,
    })),
  {
    ssr: false,
  },
);
