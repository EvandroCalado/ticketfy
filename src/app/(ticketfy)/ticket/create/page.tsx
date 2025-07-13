import Link from 'next/link';

import { MoveLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ticketsPath } from '@/utils/paths';

import { createTicket } from './actions/create-ticket';

const TicketCreatePage = () => {
  return (
    <main className='container mx-auto max-w-4xl flex-1 space-y-10 p-5'>
      <h1 className='text-xl font-semibold md:text-3xl'>Criar ticket</h1>

      <form className='space-y-5' action={createTicket}>
        <div>
          <Label htmlFor='title' className='text-muted-foreground mb-2'>
            Título
          </Label>
          <Input id='title' name='title' placeholder='Título do ticket' />
        </div>

        <div>
          <Label htmlFor='content' className='text-muted-foreground mb-2'>
            Conteúdo
          </Label>
          <Textarea
            id='content'
            name='content'
            className='min-h-48'
            placeholder='Conteúdo do ticket'
          />
        </div>

        <Button
          type='submit'
          className='mt-4 w-full'
          aria-label='Criar ticket'
          title='Criar ticket'
        >
          Criar ticket
        </Button>
      </form>

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
