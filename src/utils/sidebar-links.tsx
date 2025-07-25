import { LucideIcon, TagIcon, UserIcon } from 'lucide-react';

type SidebarLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const sidebarLinks: SidebarLink[] = [
  {
    label: 'Todos os tickets',
    href: '/tickets',
    icon: TagIcon,
  },
  {
    label: 'Meus tickets',
    href: '/my-tickets',
    icon: UserIcon,
  },
];
