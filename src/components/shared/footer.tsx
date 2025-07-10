import Link from 'next/link';

import { GithubIcon, LinkedinIcon } from 'lucide-react';

import { Button } from '../ui/button';

export const Footer = () => {
  return (
    <footer>
      <div className='container mx-auto flex flex-col items-center justify-between gap-3 p-5 md:flex-row'>
        <span className='text-muted-foreground text-sm'>
          © {new Date().getFullYear()} Evandro Calado. Todos os direitos
          reservados.
        </span>

        <span className='flex items-center gap-2'>
          <Button asChild variant='ghost' size='icon'>
            <Link
              href='https://github.com/evandrocalado'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GithubIcon />
            </Link>
          </Button>
          <Button asChild variant='ghost' size='icon'>
            <Link
              href='https://www.linkedin.com/in/evandro-calado/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <LinkedinIcon />
            </Link>
          </Button>
        </span>

        <span className='text-muted-foreground flex items-center gap-2 text-xs'>
          <Link href='/'>Política de Privacidade</Link>
          <Link href='/'>Termos de Uso</Link>
        </span>
      </div>
    </footer>
  );
};
