import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ticketsPath } from '@/utils/paths';
import { sidebarLinks } from '@/utils/sidebar-links';

import { Button } from '../ui/button';

export const SidebarLinks = () => {
  return (
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
                ticket.href.startsWith(ticketsPath()),
            },
          )}
          asChild
        >
          <Link href={ticket.href}>
            <ticket.icon />
            <span className='pointer-events-none text-left transition-opacity duration-200 lg:opacity-0 lg:group-hover:opacity-100'>
              {ticket.label}
            </span>
          </Link>
        </Button>
      ))}
    </div>
  );
};
