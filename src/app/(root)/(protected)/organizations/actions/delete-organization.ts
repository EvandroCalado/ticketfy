'use server';

import { requireAuthOnly } from '@/actions/require-auth';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';

import { getOrganizationByUser } from './get-organization-by-user';

export const deleteOrganization = async (organizationId: string) => {
  await requireAuthOnly();

  try {
    const organizations = await getOrganizationByUser();

    const canDelete = organizations.some(
      organization => organization.id === organizationId,
    );

    if (!canDelete) {
      return {
        success: false,
        message: 'Você não tem permissão para deletar essa organização',
        fieldErrors: undefined,
        payload: undefined,
      };
    }

    await prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });

    return {
      success: true,
      message: 'Organização deletada com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error);
  }
};
