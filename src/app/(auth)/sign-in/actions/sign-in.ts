'use server';

import { cookies } from 'next/headers';

import { verify } from '@node-rs/argon2';

import { InitialState } from '@/app/(root)/ticket/create/constants/initial-create-state';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';

import { signInSchema } from '../schemas/sign-in';

export const signIn = async (
  prevState: unknown,
  formData: FormData,
): Promise<InitialState> => {
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

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    return formErrorHandler(error, formData);
  }

  return {
    status: 'success',
    message: 'Usuário logado com sucesso',
    fieldErrors: undefined,
    payload: undefined,
  };
};
