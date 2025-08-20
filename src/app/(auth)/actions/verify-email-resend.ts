'use server';

import { getAuth } from '@/actions/get-auth';
import { formErrorHandler } from '@/utils/form-error-handler';

import { generateEmailVerificationCode } from '../utils/generate-email-verification-code';
import { sendEmailVerify } from '../utils/send-email-verify';

export const verifyEmailResendAction = async () => {
  const { user } = await getAuth();

  if (!user) {
    return {
      success: false,
      message: 'Usuário não autenticado',
      fieldErrors: undefined,
      payload: undefined,
    };
  }

  try {
    const emailVerificationCode = await generateEmailVerificationCode(
      user.id,
      user.email,
    );

    const result = await sendEmailVerify(
      user.name,
      user.email,
      emailVerificationCode,
    );

    if (result.error) {
      return {
        success: false,
        message: 'Erro ao reenviar o código',
        fieldErrors: undefined,
        payload: undefined,
      };
    }

    return {
      success: true,
      message: 'Código reenviado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error);
  }
};
