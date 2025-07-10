import { initialTickets } from '../../tickets/actions/get-tickets';
import { Ticket } from '../../tickets/types/ticket';

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const ticket = initialTickets.find(ticket => ticket.id === ticketId);

  return ticket || null;
};
