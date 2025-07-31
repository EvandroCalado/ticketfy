'use server';

import { prisma } from '@/lib/prisma';

type GetCommentsProps = string;

export const getComments = async (ticketId: GetCommentsProps) => {
  const comments = await prisma.comment.findMany({
    where: {
      ticketId,
    },
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
  });

  return { comments };
};
