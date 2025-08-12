'use server';

import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';

import { forgotPasswordSchema } from '../schemas/forgot-password';
import { generatePasswordResetLink } from '../utils/generate-password-reset-link';

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

    const passwordResetLink = await generatePasswordResetLink(user.id);

    //TODO: Send email
    console.log(passwordResetLink);

    return {
      success: true,
      message: 'Email enviado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
