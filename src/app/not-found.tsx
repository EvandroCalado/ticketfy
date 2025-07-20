import { Metadata } from 'next';
import Link from 'next/link';

import { MoveLeftIcon } from 'lucide-react';

import { EmptyError } from '@/components/shared/empty-error';
import { Button } from '@/components/ui/button';
import { homePath } from '@/utils/paths';

export const metadata: Metadata = {
  title: 'Ticket não encontrado',
};

const NotFound = () => {
  return (
    <div className='container mx-auto flex min-h-screen max-w-2xl flex-1 flex-col items-center justify-center gap-5 p-5'>
      <EmptyError
        label='Página não encontrada!'
        button={
          <Button asChild>
            <Link href={homePath()}>
              <MoveLeftIcon /> Voltar para Home
            </Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
