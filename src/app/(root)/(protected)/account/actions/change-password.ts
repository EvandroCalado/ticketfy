'use server';

import { getAuth } from '@/actions/get-auth';
import { RESET_PASSWORD_EVENT_NAME } from '@/app/(auth)/constants/reset-password-event-name';
import { verifyPassword } from '@/app/(auth)/utils/verify-password';
import { inngest } from '@/lib/inngest';
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
