import { User } from '@/generated/prisma';

import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';

type SidebarAvatarProps = {
  user: User;
};

export const SidebarAvatar = ({ user }: SidebarAvatarProps) => {
  return (
    <>
      <div className='flex items-center gap-2 p-3'>
        <Avatar className='size-[38px]'>
          <AvatarFallback className='bg-muted uppercase'>
            {user.name[0]}
          </AvatarFallback>
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
