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

    await prisma.organization.create({
      data: {
        name,
        membership: {
          create: {
            userId: user.id,
            isActive: false,
          },
        },
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
