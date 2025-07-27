'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import { cn } from '@/lib/utils';
import { sidebarLinks } from '@/utils/sidebar-links';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export const SidebarLinks = () => {
  const pathname = usePathname();

  return (
    <div className='space-y-2 p-3'>
      {sidebarLinks.map(ticket => (
        <Fragment key={ticket.href}>
          {ticket.separator && <Separator className='my-4' />}

          <Button
            aria-label={ticket.label}
            title={ticket.label}
            asChild
            className={cn(
              'hover:bg-muted text-foreground w-full justify-start bg-transparent',
              {
                'bg-primary hover:bg-primary/80 text-primary-foreground':
                  pathname.includes(ticket.href),
              },
            )}
          >
            <Link href={ticket.href}>
              <ticket.icon />
              <span className='pointer-events-none text-left transition-opacity duration-200 lg:opacity-0 lg:group-hover:opacity-100'>
                {ticket.label}
              </span>
            </Link>
          </Button>
        </Fragment>
      ))}
    </div>
  );
};
