'use server';

import { Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

export type GetTicketResponse = Prisma.TicketGetPayload<{
  include: { user: { select: { name: true } } };
}>;

export const getTicket = async (
  ticketId: string,
): Promise<GetTicketResponse | null> => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return ticket || null;
};
