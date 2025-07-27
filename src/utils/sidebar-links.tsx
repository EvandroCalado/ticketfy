import { LucideIcon, TagIcon, TicketIcon, UserIcon } from 'lucide-react';

import { accountPath, ticketsPath } from './paths';

type SidebarLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  separator?: boolean;
};

export const sidebarLinks: SidebarLink[] = [
  {
    label: 'Todos os tickets',
    href: ticketsPath(),
    icon: TagIcon,
  },
  {
    label: 'Meus tickets',
    href: '/my-tickets',
    icon: TicketIcon,
  },
  {
    separator: true,
    label: 'Minha conta',
    href: accountPath(),
    icon: UserIcon,
  },
];
