import { Book, Library, LucideIcon, Settings2Icon, UsersIcon } from '@/icons';

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
    label: 'Organizações',
    href: '/organizations',
    icon: UsersIcon,
  },
  {
    separator: true,
    label: 'Minha conta',
    href: accountPath(),
    icon: Settings2Icon,
  },
];
