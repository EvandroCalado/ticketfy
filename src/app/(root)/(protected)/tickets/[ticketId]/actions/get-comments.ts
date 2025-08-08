'use server';

import { SearchParams } from 'nuqs';

import { prisma } from '@/lib/prisma';

type GetCommentsProps = string;

export const getComments = async (
  ticketId: GetCommentsProps,
  searchParams?: SearchParams,
) => {
  const where = {
    ticketId,
  };

  const skip = Number(searchParams?.page) * Number(searchParams?.size);
  const take = Number(searchParams?.size);

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      take,
      skip,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  return {
    comments,
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
