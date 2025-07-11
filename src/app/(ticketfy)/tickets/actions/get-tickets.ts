'use server';

import { prisma } from '@/lib/prisma';

import { Ticket } from '/prisma/index';

export type GetTicketsResponse = {
  tickets: Ticket[];
  count: number;
};

export const getTickets = async (): Promise<GetTicketsResponse> => {
  const tickets = await prisma.ticket.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const count = await prisma.ticket.count();

  return { tickets, count };
};
