'use client';

import { User } from '@/generated/prisma';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebar';

import { Card } from '../ui/card';
import { SidebarAvatar } from './sidebar-avatar';
import { SidebarLinks } from './sidebar-links';
import { SidebarLogout } from './sidebar-logout';
import { SidebarToggle } from './sidebar-toggle';

type SidebarProps = {
  user: User;
};

export const Sidebar = ({ user }: SidebarProps) => {
  const { isOpen } = useSidebarStore(state => state);

  return (
    <Card
      className={cn(
        [
          'animate-sidebar-from-left',
          'group m-5 h-[750px] w-[64px] gap-2 py-0 max-lg:w-52',
          'transition-all duration-200',
          'absolute top-20 -left-[229px] z-20 lg:left-5',
          'lg:hover:w-52',
        ],
        {
          'max-lg:left-5': isOpen,
        },
      )}
    >
      <SidebarToggle />
      <SidebarAvatar user={user} />
      <SidebarLinks />
      <SidebarLogout />
    </Card>
  );
};
