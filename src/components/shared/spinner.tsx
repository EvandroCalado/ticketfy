import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

type SpinnerSize = '4' | '8' | '16';

type SpinnerProps = {
  className?: string;
  size?: SpinnerSize;
};

export const Spinner = ({ className, size = '8' }: SpinnerProps) => {
  return (
    <div className={cn('flex flex-1 items-center justify-center', className)}>
      <Loader2 className={cn(`size-${size} animate-spin`)} />
    </div>
  );
};
