'use server';

import { verify } from '@node-rs/argon2';

import { setSessionCookie } from '@/actions/set-session-cookie';
import { createSession } from '@/lib/oslo';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { generateRandomToken } from '@/utils/generate-random-token';

import { SignInSchema, signInSchema } from '../schemas/sign-in';

export type SignInResult = {
  success: boolean;
  message: string;
};

export const signIn = async (data: SignInSchema): Promise<SignInResult> => {
  try {
    const { email, password } = signInSchema.parse(data);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        success: false,
        message: 'Usuário não encontrado',
      };
    }

    const isPasswordValid = await verify(user.passwordHash, password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Credenciais inválidas',
      };
    }

    const sessionToken = generateRandomToken();
    const sessionCookie = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, sessionCookie.expiresAt);

    return {
      success: true,
      message: 'Usuário logado com sucesso',
    };
  } catch (error) {
    return formErrorHandler(error);
  }
};
