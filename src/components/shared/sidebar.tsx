'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { TagIcon, UserIcon } from 'lucide-react';

import { User } from '@/generated/prisma';
import { cn } from '@/lib/utils';
import { ticketsPath } from '@/utils/paths';

import { Button } from '../ui/button';
import { Card } from '../ui/card';

type SidebarProps = {
  user: User;
};

export const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();

  console.log(user);

  return (
    <Card className='animate-sidebar-from-left group h-full w-[64px] py-0 transition-all duration-200 hover:w-52'>
      <div className='space-y-2 p-3'>
        <Button
          className={cn('hover:bg-muted w-full justify-start bg-transparent', {
            'bg-primary hover:bg-primary/80': pathname === ticketsPath(),
          })}
          asChild
        >
          <Link href={ticketsPath()}>
            <TagIcon />
            <span className='pointer-events-none text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
              Todos os tickets
            </span>
          </Link>
        </Button>

        <Button
          className={cn('hover:bg-muted w-full justify-start bg-transparent', {
            'bg-primary hover:bg-primary/80':
              pathname === `/tickets/user/${user.id}`,
          })}
          asChild
        >
          <Link href={`/tickets/user/${user.id}`}>
            <UserIcon />
            <span className='pointer-events-none text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
              Meus tickets
            </span>
          </Link>
        </Button>
      </div>
    </Card>
  );
};
