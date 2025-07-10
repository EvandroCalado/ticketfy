'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { navLinks } from '@/utils/nav-links';

import { Button } from '../ui/button';
import { DarkMode } from './dark-mode';
import { Logo } from './logo';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className='border-border border-b'>
      <div className='container mx-auto flex items-center justify-between p-5'>
        <Logo />

        <nav className='hidden items-center gap-2 md:flex md:gap-5'>
          {navLinks.map(link => (
            <Button
              key={link.href}
              asChild
              variant='ghost'
              className={cn('w-20', pathname === link.href && 'bg-muted')}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className='flex items-center gap-2 md:gap-3'>
          <DarkMode />
          <Button variant='ghost' className='w-24'>
            Cadastrar
          </Button>
          <Button className='w-24'>Entrar</Button>
        </div>
      </div>
    </header>
  );
};
