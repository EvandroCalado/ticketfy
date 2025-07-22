'use server';

import { hash } from '@node-rs/argon2';

import { setSessionCookie } from '@/actions/set-session-cookie';
import { InitialActionsState } from '@/constants/initial-create-state';
import { createSession } from '@/lib/oslo';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { generateRandomToken } from '@/utils/generate-random-token';

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

    const sessionToken = generateRandomToken();
    const sessionCookie = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, sessionCookie.expiresAt);

    return {
      status: 'success',
      message: 'Usuário criado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
