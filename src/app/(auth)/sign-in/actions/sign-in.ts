'use server';

import { verify } from '@node-rs/argon2';

import { setSessionCookie } from '@/actions/set-session-cookie';
import { InitialActionsState } from '@/constants/initial-create-state';
import { createSession } from '@/lib/oslo';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { generateRandomToken } from '@/utils/generate-random-token';

import { signInSchema } from '../schemas/sign-in';

export const signIn = async (
  prevState: unknown,
  formData: FormData,
): Promise<InitialActionsState> => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        status: 'error',
        message: 'Usuário não encontrado',
        fieldErrors: undefined,
        payload: undefined,
      };
    }

    const isPasswordValid = await verify(user.passwordHash, password);

    if (!isPasswordValid) {
      return {
        status: 'error',
        message: 'Credenciais inválidas',
        fieldErrors: undefined,
        payload: undefined,
      };
    }

    const sessionToken = generateRandomToken();
    const sessionCookie = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, sessionCookie.expiresAt);

    return {
      status: 'success',
      message: 'Usuário logado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
