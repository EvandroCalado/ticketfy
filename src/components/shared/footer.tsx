import Link from 'next/link';

import { GithubIcon, LinkedinIcon } from 'lucide-react';

export const Footer = () => {
  return (
    <footer>
      <div className='text-muted-foreground relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 p-5 md:flex-row'>
        <span className='text-sm'>
          © {new Date().getFullYear()} Evandro Calado. Todos os direitos
          reservados.
        </span>

        <div className='right-1/2 flex translate-x-1/2 items-center gap-4 md:absolute'>
          <Link
            aria-label='Github'
            title='Github'
            href='https://github.com/evandrocalado'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground duration-150'
          >
            <GithubIcon className='size-5' />
          </Link>
          <Link
            aria-label='Linkedin'
            title='Linkedin'
            href='https://www.linkedin.com/in/evandro-calado/'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground duration-150'
          >
            <LinkedinIcon className='size-5' />
          </Link>
        </div>

        <span className='text-muted-foreground flex items-center gap-4 text-xs'>
          <Link
            aria-label='Política de Privacidade'
            title='Política de Privacidade'
            href='/'
            className='hover:text-foreground duration-150'
          >
            Política de Privacidade
          </Link>
          <Link
            aria-label='Termos de Uso'
            title='Termos de Uso'
            href='/'
            className='hover:text-foreground duration-150'
          >
            Termos de Uso
          </Link>
        </span>
      </div>
    </footer>
  );
};
