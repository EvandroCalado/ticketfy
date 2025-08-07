'use server';

import { prisma } from '@/lib/prisma';

type GetCommentsProps = string;

export const getComments = async (
  ticketId: GetCommentsProps,
  offset?: number,
) => {
  const skip = offset ?? 0;
  const take = 2;

  const where = {
    ticketId,
  };

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
