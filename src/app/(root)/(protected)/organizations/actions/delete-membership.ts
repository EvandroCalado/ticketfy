'use server';

import { requireAuthOnly } from '@/actions/require-auth';
import { prisma } from '@/lib/prisma';

import { getMemberships } from './get-memberships';

export const deleteMembership = async (
  userId: string,
  organizationId: string,
) => {
  const { user } = await requireAuthOnly();

  const memberships = await getMemberships(organizationId);

  const myMembership = (memberships ?? []).find(
    membership => membership.userId === user.id,
  );

  const isMyself = user.id === userId;
  const isAdmin = myMembership?.membershipRole === 'ADMIN';

  if (!isMyself && !isAdmin) {
    return {
      success: false,
      message: 'Somente o administrador pode deletar membros',
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
    message: isMyself
      ? 'Você saiu da organização com sucesso'
      : 'Membro deletado com sucesso',
    fieldErrors: undefined,
    payload: undefined,
  };
};
