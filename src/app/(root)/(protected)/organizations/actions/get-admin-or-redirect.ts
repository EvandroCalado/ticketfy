'use server';

import { redirect } from 'next/navigation';

import { requireAuthOnly } from '@/actions/require-auth';
import { signInPath } from '@/utils/paths';

import { getMembership } from './get-membership';

export const getAdminOrRedirect = async (organizationId: string) => {
  const { user } = await requireAuthOnly();

  const membership = await getMembership({
    organizationId,
    userId: user.id,
  });

  if (!membership) {
    return {
      success: false,
      message: 'Organização não encontrada',
      fieldErrors: undefined,
      payload: undefined,
    };
  }

  if (membership.membershipRole !== 'ADMIN') redirect(signInPath());

  return { user, membership };
};
