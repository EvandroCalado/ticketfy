'use server';

import { requireAuthOnly } from '@/actions/require-auth';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';

import { getOrganizationByUser } from './get-organization-by-user';

export const switchOrganization = async (organizationId: string) => {
  const { user } = await requireAuthOnly();

  try {
    const organizations = await getOrganizationByUser();

    const canSwitch = organizations.some(
      organization => organization.id === organizationId,
    );

    if (!canSwitch) {
      return {
        success: false,
        message: 'Organização não encontrada',
        fieldErrors: undefined,
        payload: undefined,
      };
    }

    await prisma.$transaction([
      prisma.membership.updateMany({
        where: {
          userId: user.id,
          organizationId: {
            not: organizationId,
          },
        },
        data: {
          isActive: false,
        },
      }),
      prisma.membership.update({
        where: {
          membershipId: {
            userId: user.id,
            organizationId,
          },
        },
        data: {
          isActive: true,
        },
      }),
    ]);

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
