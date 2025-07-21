'use server';

import { prisma } from '@/lib/prisma';

import { Prisma } from '/prisma/index';

export type GetTicketsResponse = {
  tickets: Prisma.TicketGetPayload<{ include: { user: true } }>[];
  count: number;
};

export const getTickets = async (): Promise<GetTicketsResponse> => {
  const tickets = await prisma.ticket.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      user: true,
    },
  });

  const count = await prisma.ticket.count();

  return { tickets, count };
};
