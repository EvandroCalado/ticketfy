'use server';

import { requireAuthOnly } from '@/actions/require-auth';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';

import { createOrganizationSchema } from '../schemas/create-organization';

export const createOrganization = async (
  prevState: unknown,
  formData: FormData,
) => {
  const { user } = await requireAuthOnly();

  try {
    const { name } = createOrganizationSchema.parse(
      Object.fromEntries(formData),
    );

    const organization = await prisma.organization.create({
      data: {
        name,
        membership: {
          create: {
            userId: user.id,
            isActive: true,
          },
        },
      },
    });

    await prisma.membership.updateMany({
      where: {
        userId: user.id,
        organizationId: {
          not: organization.id,
        },
      },
      data: {
        isActive: false,
      },
    });

    return {
      success: true,
      message: 'Organização criada com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
