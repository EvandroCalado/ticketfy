import { BookIcon, LibraryIcon, LucideIcon, UserCogIcon } from 'lucide-react';

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
    icon: LibraryIcon,
  },
  {
    label: 'Meus tickets',
    href: '/my-tickets',
    icon: BookIcon,
  },
  {
    separator: true,
    label: 'Minha conta',
    href: accountPath(),
    icon: UserCogIcon,
  },
];
