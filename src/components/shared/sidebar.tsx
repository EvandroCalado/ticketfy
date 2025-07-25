'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronRightIcon } from 'lucide-react';

import { User } from '@/generated/prisma';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebar';
import { sidebarLinks } from '@/utils/sidebar-links';

import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type SidebarProps = {
  user: User;
};

export const Sidebar = ({ user }: SidebarProps) => {
  const { isOpen, toggle } = useSidebarStore(state => state);

  const pathname = usePathname();

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
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label='Abre/fecha menu'
            title='Abre/fecha menu'
            className='absolute top-4 -right-[18px] z-40 size-6 rounded-full md:hidden'
            onClick={() => toggle()}
          >
            <ChevronRightIcon
              className={cn({
                'rotate-180 transition-transform duration-200': isOpen,
              })}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side='right'>
          <span>Abre/Fecha Menu</span>
        </TooltipContent>
      </Tooltip>

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

      <div className='space-y-2 p-3'>
        {sidebarLinks.map(ticket => (
          <Button
            key={ticket.href}
            aria-label={ticket.label}
            title={ticket.label}
            className={cn(
              'hover:bg-muted text-foreground w-full justify-start bg-transparent',
              {
                'bg-primary hover:bg-primary/80 text-primary-foreground':
                  pathname === ticket.href,
              },
            )}
            asChild
          >
            <Link href={ticket.href}>
              <ticket.icon />
              <span className='pointer-events-none text-left transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100'>
                {ticket.label}
              </span>
            </Link>
          </Button>
        ))}
      </div>
    </Card>
  );
};
