'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { User } from 'lucia';

import { getAuth } from '@/actions/get-auth';
import { signOut } from '@/actions/sign-out';
import { cn } from '@/lib/utils';
import { navLinks } from '@/utils/nav-links';
import { signInPath, signUpPath } from '@/utils/paths';

import { Button } from '../ui/button';
import { DarkMode } from './dark-mode';
import { Logo } from './logo';

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <header className='border-border border-b'>
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
              <Button type='submit' className='w-24'>
                Sair
              </Button>
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
