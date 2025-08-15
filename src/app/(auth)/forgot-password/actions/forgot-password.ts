'use server';

import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';

import { RESET_PASSWORD_EVENT_NAME } from '../../reset-password/[tokenId]/constants/reset-password-event-name';
import { forgotPasswordSchema } from '../schemas/forgot-password';

export const forgotPassword = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const { email } = forgotPasswordSchema.parse(Object.fromEntries(formData));

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        success: false,
        message: 'Email não cadastrado',
        fieldErrors: undefined,
        payload: undefined,
      };
    }

    await inngest.send({
      name: RESET_PASSWORD_EVENT_NAME,
      data: { userId: user.id },
    });

    return {
      success: true,
      message: 'Verifique seu email para redefinir sua senha',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
