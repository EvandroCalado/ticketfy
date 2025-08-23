'use server';

import { requireAuthOnly } from '@/actions/require-auth';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';

export const switchOrganization = async (organizationId: string) => {
  const { user } = await requireAuthOnly();

  try {
    await prisma.membership.updateMany({
      where: {
        userId: user.id,
        organizationId: {
          not: organizationId,
        },
      },
      data: {
        isActive: false,
      },
    });

    await prisma.membership.update({
      where: {
        userId_organizationId: {
          userId: user.id,
          organizationId,
        },
      },
      data: {
        isActive: true,
      },
    });

    return {
      success: true,
      message: 'Organização alterada com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error);
  }
};
