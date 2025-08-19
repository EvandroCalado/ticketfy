'use server';

import { notFound, redirect } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { prisma } from '@/lib/prisma';
import { organizationCreatePath } from '@/utils/paths';

export const getOrganizationByUser = async () => {
  const { user } = await getAuth();

  if (!user) notFound();

  const organizations = await prisma.organization.findMany({
    where: {
      membership: {
        some: {
          userId: user.id,
        },
      },
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

  if (!organizations.length) redirect(organizationCreatePath());

  return organizations.map(({ membership, ...organization }) => ({
    ...organization,
    membershipByUser: membership[0],
  }));
};
