'use server';

import { requireAuthOnly } from '@/actions/require-auth';
import { prisma } from '@/lib/prisma';

import { getMemberships } from './get-memberships';

export const deleteMembership = async (
  userId: string,
  organizationId: string,
) => {
  await requireAuthOnly();

  const memberships = await getMemberships(organizationId);

  const isLastMembership = (memberships ?? []).length === 1;

  if (isLastMembership) {
    return {
      success: false,
      message: 'Você não pode deletar o ultimo membro da organização',
      fieldErrors: undefined,
      payload: undefined,
    };
  }

  await prisma.membership.delete({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
  });

  return {
    success: true,
    message: 'Membro deletado com sucesso',
    fieldErrors: undefined,
    payload: undefined,
  };
};
