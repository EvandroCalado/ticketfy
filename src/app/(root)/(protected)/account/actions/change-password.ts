'use server';

import { getAuth } from '@/actions/get-auth';
import { generatePasswordResetLink } from '@/app/(auth)/forgot-password/utils/generate-password-reset-link';
import { verifyPassword } from '@/app/(auth)/reset-password/[tokenId]/utils/verify-password';
import { formErrorHandler } from '@/utils/form-error-handler';

import { changePasswordSchema } from '../schemas/change-password';

export const changePassword = async (
  prevState: unknown,
  formData: FormData,
) => {
  const { user } = await getAuth();

  if (!user) {
    return {
      success: false,
      message: 'Credenciais inválidas',
      fieldErrors: undefined,
      payload: undefined,
    };
  }

  try {
    const { password } = changePasswordSchema.parse(
      Object.fromEntries(formData),
    );

    const isValidPassword = await verifyPassword(user.passwordHash, password);

    if (!isValidPassword) {
      return {
        success: false,
        message: 'Senha atual incorreta',
        fieldErrors: undefined,
        payload: undefined,
      };
    }

    const passwordResetLink = await generatePasswordResetLink(user.id);

    // Send email with password reset link
    TODO: console.log(passwordResetLink);

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
