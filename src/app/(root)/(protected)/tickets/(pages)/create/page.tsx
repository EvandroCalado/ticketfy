import { Metadata } from 'next';

import { PageTitle } from '@/components/shared/page-title';
import { ticketsPath } from '@/utils/paths';

import { TicketCreateForm } from '../../components/ticket-create-form';

export const metadata: Metadata = {
  title: 'Criar ticket',
};

const TicketCreatePage = () => {
  const breadcrumbs = [
    {
      title: 'Tickets',
      href: ticketsPath(),
    },
    {
      title: 'Criar ticket',
    },
  ];

  return (
    <main className='animate-fade-from-top mx-auto w-full max-w-5xl space-y-10'>
      <PageTitle title='Criar ticket' breadcrumbs={breadcrumbs} />
      <TicketCreateForm />
    </main>
  );
};

export default TicketCreatePage;
