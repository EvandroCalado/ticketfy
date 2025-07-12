import Link from 'next/link';

import { GithubIcon, LinkedinIcon } from 'lucide-react';

export const Footer = () => {
  return (
    <footer>
      <div className='text-muted-foreground container mx-auto flex flex-col items-center justify-between gap-3 p-5 md:flex-row'>
        <span className='text-sm'>
          © {new Date().getFullYear()} Evandro Calado. Todos os direitos
          reservados.
        </span>

        <span className='flex items-center gap-4'>
          <Link
            href='https://github.com/evandrocalado'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground duration-150'
          >
            <GithubIcon className='size-5' />
          </Link>
          <Link
            href='https://www.linkedin.com/in/evandro-calado/'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground duration-150'
          >
            <LinkedinIcon className='size-5' />
          </Link>
        </span>

        <span className='text-muted-foreground flex items-center gap-4 text-xs'>
          <Link href='/' className='hover:text-foreground duration-150'>
            Política de Privacidade
          </Link>
          <Link href='/' className='hover:text-foreground duration-150'>
            Termos de Uso
          </Link>
        </span>
      </div>
    </footer>
  );
};
