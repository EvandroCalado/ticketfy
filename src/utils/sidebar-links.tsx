import { Book, Library, LucideIcon, UserCog } from 'lucide-react';

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
    icon: Library,
  },
  {
    label: 'Meus tickets',
    href: '/tickets/my',
    icon: Book,
  },
  {
    separator: true,
    label: 'Minha conta',
    href: accountPath(),
    icon: UserCog,
  },
];
