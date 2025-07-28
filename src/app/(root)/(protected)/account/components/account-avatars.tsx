'use client';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useAvatarStore } from '@/stores/avatars';
import { avatarOptions } from '@/utils/avatar-options';

export const AccountAvatars = () => {
  const { setOption } = useAvatarStore(state => state);

  return (
    <div>
      <h2 className='text-xl font-semibold'>Avatares</h2>
      <Separator className='my-4' />

      <div className='flex flex-wrap items-center justify-center gap-2'>
        {avatarOptions.map(option => (
          <button
            key={option.bg}
            onClick={() => setOption(option)}
            className={cn(
              'border-muted hover:border-primary h-12 w-12 cursor-pointer rounded-md border-4 font-semibold transition-colors duration-150 ease-in-out',
              option.bg,
              option.text,
            )}
          >
            A
          </button>
        ))}
      </div>
    </div>
  );
};
