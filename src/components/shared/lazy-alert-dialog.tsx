'use client';

import dynamic from 'next/dynamic';

const LazyAlertDialog = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => ({
      default: mod.AlertDialog,
    })),
  { ssr: false },
);

const LazyAlertDialogTrigger = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => ({
      default: mod.AlertDialogTrigger,
    })),
  { ssr: false },
);

const LazyAlertDialogContent = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => ({
      default: mod.AlertDialogContent,
    })),
  { ssr: false },
);

const LazyAlertDialogHeader = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => ({
      default: mod.AlertDialogHeader,
    })),
  { ssr: false },
);

const LazyAlertDialogTitle = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => ({
      default: mod.AlertDialogTitle,
    })),
  { ssr: false },
);

const LazyAlertDialogDescription = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => ({
      default: mod.AlertDialogDescription,
    })),
  { ssr: false },
);

const LazyAlertDialogFooter = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => ({
      default: mod.AlertDialogFooter,
    })),
  { ssr: false },
);

const LazyAlertDialogCancel = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => ({
      default: mod.AlertDialogCancel,
    })),
  { ssr: false },
);

const LazyAlertDialogAction = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => ({
      default: mod.AlertDialogAction,
    })),
  { ssr: false },
);

export {
  LazyAlertDialog,
  LazyAlertDialogAction,
  LazyAlertDialogCancel,
  LazyAlertDialogContent,
  LazyAlertDialogDescription,
  LazyAlertDialogFooter,
  LazyAlertDialogHeader,
  LazyAlertDialogTitle,
  LazyAlertDialogTrigger,
};
