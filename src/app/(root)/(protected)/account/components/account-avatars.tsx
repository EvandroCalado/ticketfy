'use client';

import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useAvatarStore } from '@/stores/avatars';
import { avatarOptions } from '@/utils/avatar-options';

export const AccountAvatars = () => {
  const { image, setImage } = useAvatarStore(state => state);

  return (
    <div>
      <h2 className='text-xl font-semibold'>Avatares</h2>
      <Separator className='my-4' />

      <div className='flex flex-wrap items-center justify-start gap-2'>
        {avatarOptions.map(option => (
          <button
            key={option.image}
            onClick={() => setImage(option.image)}
            className={cn(
              'border-muted hover:border-primary size-14 cursor-pointer rounded-full border-4 transition-colors duration-150 ease-in-out',
              {
                'border-primary': image === option.image,
              },
            )}
          >
            <Image
              src={option.image}
              alt='Avatar'
              width={50}
              height={50}
              priority
            />
          </button>
        ))}
      </div>
    </div>
  );
};
