'use client';

import Link from 'next/link';

import { HomeIcon } from 'lucide-react';

import { EmptyError } from '@/components/shared/empty-error';
import { Button } from '@/components/ui/button';

const TicketsErrorPage = ({ error }: { error: Error }) => {
  return (
    <div className='flex h-full flex-1 items-center justify-center p-5'>
      <EmptyError
        label={error.message || 'Erro ao carregar tickets'}
        button={
          <Button asChild>
            <Link href='/'>
              <HomeIcon /> Voltar para Home
            </Link>
          </Button>
        }
      />
    </div>
  );
};

export default TicketsErrorPage;
