'use server';

import { getAuth } from '@/actions/get-auth';
import { setSessionCookie } from '@/actions/set-session-cookie';
import { createSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { generateRandomToken } from '@/utils/generate-random-token';

import { verifyEmailSchema } from '../schemas/verify-email';

export const verifyEmail = async (prevState: unknown, formData: FormData) => {
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
    const { code } = verifyEmailSchema.parse(Object.fromEntries(formData));

    const emailVerificationToken =
      await prisma.emailVerificationToken.findFirst({
        where: { userId: user.id, email: user.email, code },
      });

    if (!emailVerificationToken) {
      return {
        success: false,
        message: 'Código de verificação inválido',
        fieldErrors: undefined,
        payload: undefined,
      };
    }

    const isExpired = Date.now() > emailVerificationToken.expiresAt.getTime();

    if (isExpired) {
      return {
        success: false,
        message: 'Código de verificação expirado',
        fieldErrors: undefined,
        payload: undefined,
      };
    }

    await prisma.emailVerificationToken.delete({
      where: { id: emailVerificationToken.id },
    });

    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);

    return {
      success: true,
      message: 'Email verificado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
