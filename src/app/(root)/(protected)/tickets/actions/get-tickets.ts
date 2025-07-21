'use server';

import { redirect } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { prisma } from '@/lib/prisma';
import { signInPath } from '@/utils/paths';

import { Prisma } from '/prisma/index';

export type GetTicketsResponse = {
  tickets: Prisma.TicketGetPayload<{
    include: { user: { select: { name: true } } };
  }>[];
  count: number;
};

export const getTickets = async (): Promise<GetTicketsResponse> => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  const tickets = await prisma.ticket.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  const count = await prisma.ticket.count({
    where: {
      userId: user.id,
    },
  });

  return { tickets, count };
};
