'use server';

import { SearchParams } from 'nuqs';

import { Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

export type GetTicketsResponse = {
  tickets: Prisma.TicketGetPayload<{
    include: { user: { select: { name: true } } };
  }>[];
  metadata: {
    count: number;
    hasNextPage: boolean;
  };
};

export const getTickets = async (
  userId: string | undefined,
  searchParams?: SearchParams,
): Promise<GetTicketsResponse> => {
  const where = {
    userId,
    ...(typeof searchParams?.search === 'string' && {
      title: {
        contains: searchParams.search,
        mode: 'insensitive' as const,
      },
    }),
  };

  const skip = Number(searchParams?.page) * Number(searchParams?.size);
  const take = Number(searchParams?.size);

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      orderBy: {
        ...(searchParams?.sort === 'newest' && { createdAt: 'desc' }),
        ...(searchParams?.sort === 'oldest' && { createdAt: 'asc' }),
        ...(searchParams?.sort === 'bounty' && { bounty: 'desc' }),
      },
      skip,
      take,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    tickets,
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
