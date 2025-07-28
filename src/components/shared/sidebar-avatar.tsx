'use client';

import { User } from '@/generated/prisma';
import { cn } from '@/lib/utils';
import { useAvatarStore } from '@/stores/avatars';

import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

type SidebarAvatarProps = {
  user: User;
};

export const SidebarAvatar = ({ user }: SidebarAvatarProps) => {
  const { option, hasHydrated } = useAvatarStore();

  return (
    <>
      <div className='flex items-center gap-2 p-3'>
        <Avatar className='size-[38px]'>
          {!hasHydrated ? (
            <Skeleton className='h-[38px] w-[38px] animate-pulse' />
          ) : (
            <AvatarFallback className={cn('uppercase', option.text, option.bg)}>
              {user.name[0]}
            </AvatarFallback>
          )}
        </Avatar>
        <div className='pointer-events-none text-left text-xs font-semibold transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100'>
          <span className='block capitalize'>{user.name}</span>
          <span className='text-muted-foreground/40 block text-xs'>
            {user.email}
          </span>
        </div>
      </div>

      <Separator />
    </>
  );
};
