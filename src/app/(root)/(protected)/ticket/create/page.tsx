import { Metadata } from 'next';
import Link from 'next/link';

import { MoveLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ticketsPath } from '@/utils/paths';

import { TicketCreateForm } from './components/ticket-create-form';

export const metadata: Metadata = {
  title: 'Criar ticket',
};

const TicketCreatePage = () => {
  return (
    <main className='mx-auto w-full max-w-3xl space-y-10 p-5'>
      <h1 className='text-xl font-semibold md:text-3xl'>Criar ticket</h1>

      <TicketCreateForm />

      <Button
        asChild
        variant='outline'
        aria-label='Voltar para tickets'
        title='Voltar para tickets'
      >
        <Link href={ticketsPath()}>
          <MoveLeftIcon /> Voltar
        </Link>
      </Button>
    </main>
  );
};

export default TicketCreatePage;
