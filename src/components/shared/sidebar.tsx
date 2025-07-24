'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { TagIcon, UserIcon } from 'lucide-react';

import { User } from '@/generated/prisma';
import { cn } from '@/lib/utils';
import { ticketsPath } from '@/utils/paths';

import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';

type SidebarProps = {
  user: User;
};

export const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <Card className='animate-sidebar-from-left group h-full w-[64px] gap-2 py-0 transition-all duration-200 hover:w-52'>
      <div className='flex items-center gap-2 p-3'>
        <Avatar className='size-[38px]'>
          <AvatarFallback className='bg-muted uppercase'>
            {user.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className='pointer-events-none text-left text-xs font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
          <span className='block capitalize'>{user.name}</span>
          <span className='text-muted-foreground/40 block text-xs'>
            {user.email}
          </span>
        </div>
      </div>

      <Separator />

      <div className='space-y-2 p-3'>
        <Button
          aria-label='Todos os tickets'
          title='Todos os tickets'
          className={cn(
            'hover:bg-muted text-foreground w-full justify-start bg-transparent',
            {
              'bg-primary hover:bg-primary/80 text-primary-foreground':
                pathname === ticketsPath(),
            },
          )}
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
          aria-label='Meus tickets'
          title='Meus tickets'
          className={cn(
            'hover:bg-muted text-foreground w-full justify-start bg-transparent',
            {
              'bg-primary hover:bg-primary/80 text-primary-foreground':
                pathname === `/tickets/user/${user.id}`,
            },
          )}
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
