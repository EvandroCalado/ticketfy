'use server';

import { cookies } from 'next/headers';

import { hash } from '@node-rs/argon2';

import { InitialActionsState } from '@/constants/initial-create-state';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';

import { signUpSchema } from '../schemas/sign-up';

export const signUp = async (
  prevState: unknown,
  formData: FormData,
): Promise<InitialActionsState> => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData),
    );

    const passwordHash = await hash(password);

    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        passwordHash,
      },
    });

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
    message: 'Usuário criado com sucesso',
    fieldErrors: undefined,
    payload: undefined,
  };
};
