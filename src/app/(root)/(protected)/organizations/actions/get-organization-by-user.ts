'use server';

import { requireAuthOnly } from '@/actions/require-auth';
import { prisma } from '@/lib/prisma';

export const getOrganizationByUser = async () => {
  const { user } = await requireAuthOnly();

  const organizations = await prisma.organization.findMany({
    where: {
      membership: {
        some: {
          userId: user.id,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      membership: {
        where: {
          userId: user.id,
        },
      },
      _count: {
        select: { membership: true },
      },
    },
  });

  return organizations.map(({ membership, ...organization }) => ({
    ...organization,
    membershipByUser: membership[0],
  }));
};
