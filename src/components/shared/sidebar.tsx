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
          'group h-full max-h-[775px] w-[64px] gap-2 py-0 max-md:w-52',
          'transition-all duration-200',
          'absolute top-5 -left-52 z-20',
          'md:static md:hover:w-52',
        ],
        {
          'left-5': isOpen,
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
