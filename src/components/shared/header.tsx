'use client';

import Link from 'next/link';

import { signOut } from '@/actions/sign-out';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { navLinks } from '@/utils/nav-links';
import { signInPath, signUpPath } from '@/utils/paths';

import { Button } from '../ui/button';
import { DarkMode } from './dark-mode';
import { Logo } from './logo';
import { SubmitButton } from './submit-button';

export const Header = () => {
  const [user, isFetchUser, pathname] = useAuth();

  if (!isFetchUser) return null;

  return (
    <header className='border-border animate-header-from-top bg-background absolute top-0 right-0 left-0 z-50 border-b'>
      <div className='container mx-auto flex items-center justify-between p-5'>
        <Logo />

        <nav className='hidden items-center gap-2 md:flex md:gap-5'>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn('hover:text-primary w-16 duration-150', {
                'text-primary': pathname === link.href,
              })}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-2 md:gap-3'>
          <DarkMode />

          {user ? (
            <form action={signOut}>
              <SubmitButton className='w-24'>Sair</SubmitButton>
            </form>
          ) : (
            <>
              <Button variant='ghost' className='w-24' asChild>
                <Link href={signUpPath()}>Cadastrar</Link>
              </Button>

              <Button className='w-24' asChild>
                <Link href={signInPath()}>Entrar</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
