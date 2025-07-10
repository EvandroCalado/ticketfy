import { Suspense } from 'react';

import { TicketsList } from './components/tickets-list';

const TicketsPage = async () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <TicketsList />
    </Suspense>
  );
};

export default TicketsPage;
