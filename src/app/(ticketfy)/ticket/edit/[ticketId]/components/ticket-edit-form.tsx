import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { updateTicket } from '../actions/update-ticket';
import { Ticket } from '/prisma/index';

type TicketEditFormProps = {
  ticket: Ticket;
};

export const TicketEditForm = ({ ticket }: TicketEditFormProps) => {
  return (
    <form className='space-y-5' action={updateTicket.bind(null, ticket.id)}>
      <div className='flex flex-col items-center gap-5 md:flex-row'>
        <div className='w-full'>
          <Label htmlFor='title' className='text-muted-foreground mb-2'>
            Título
          </Label>
          <Input
            id='title'
            name='title'
            placeholder='Título do ticket'
            defaultValue={ticket.title}
          />
        </div>

        <div className='w-full md:w-[180px]'>
          <Label className='text-muted-foreground mb-2'>Status</Label>
          <Select
            name='status'
            aria-label='Status do ticket'
            defaultValue={ticket.status}
          >
            <SelectTrigger className='w-full md:w-[180px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='OPEN'>Em aberto</SelectItem>
              <SelectItem value='IN_PROGRESS'>Em andamento</SelectItem>
              <SelectItem value='DONE'>Concluído</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
          defaultValue={ticket.content}
        />
      </div>

      <Button
        type='submit'
        className='mt-4 w-full'
        aria-label='Salvar ticket'
        title='Salvar ticket'
      >
        Salvar
      </Button>
    </form>
  );
};
