'use server';

import { SearchParams } from 'nuqs';

import { Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

export type GetTicketsResponse = {
  tickets: Prisma.TicketGetPayload<{
    include: { user: { select: { name: true } } };
  }>[];
  count: number;
};

export const getTickets = async (
  userId: string | undefined,
  searchParams?: SearchParams,
): Promise<GetTicketsResponse> => {
  const tickets = await prisma.ticket.findMany({
    where: {
      userId,
      ...(typeof searchParams?.search === 'string' && {
        title: {
          contains: searchParams.search,
          mode: 'insensitive',
        },
      }),
    },
    orderBy: {
      ...(searchParams?.sort === 'newest' && { createdAt: 'desc' }),
      ...(searchParams?.sort === 'oldest' && { createdAt: 'asc' }),
      ...(searchParams?.sort === 'bounty' && { bounty: 'desc' }),
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
      userId,
      ...(typeof searchParams?.search === 'string' && {
        title: {
          contains: searchParams.search,
          mode: 'insensitive',
        },
      }),
    },
  });

  return { tickets, count };
};
