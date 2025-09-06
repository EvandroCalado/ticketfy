'use server';

import { requireAuthOnly } from '@/actions/require-auth';
import { prisma } from '@/lib/prisma';

type GetMembershipParams = {
  organizationId: string;
  userId: string;
};

export const getMembership = async ({
  organizationId,
  userId,
}: GetMembershipParams) => {
  await requireAuthOnly();

  return await prisma.membership.findUnique({
    where: {
      membershipId: {
        organizationId,
        userId,
      },
    },
  });
};
