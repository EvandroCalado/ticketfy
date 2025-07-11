'use server';

import { prisma } from '@/lib/prisma';

import { Ticket } from '/prisma/index';

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  return ticket || null;
};
