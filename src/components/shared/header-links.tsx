import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { navLinks } from '@/utils/nav-links';

export const HeaderLinks = () => {
  const pathname = usePathname();

  return (
    <nav className='flex items-center gap-3 md:gap-5'>
      {navLinks.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={cn('hover:text-primary duration-150', {
            'text-primary': pathname === link.href,
          })}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
