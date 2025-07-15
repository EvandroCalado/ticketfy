import Link from 'next/link';

import { MoveLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ticketsPath } from '@/utils/paths';

import { TicketCreateForm } from './components/ticket-create-form';

const TicketCreatePage = () => {
  return (
    <main className='container mx-auto max-w-4xl flex-1 space-y-10 p-5'>
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
