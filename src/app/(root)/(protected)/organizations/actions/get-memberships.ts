'use server';

import { requireAuthOnly } from '@/actions/require-auth';
import { prisma } from '@/lib/prisma';

export const getMemberships = async (organizationId: string) => {
  await requireAuthOnly();

  return await prisma.membership.findMany({
    where: {
      organizationId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          emailVerified: true,
        },
      },
    },
  });
};
