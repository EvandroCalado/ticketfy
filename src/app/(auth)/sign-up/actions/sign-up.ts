'use server';

import { hash } from '@node-rs/argon2';

import { setSessionCookie } from '@/actions/set-session-cookie';
import { createSession } from '@/lib/oslo';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { generateRandomToken } from '@/utils/generate-random-token';

import { signUpSchema } from '../schemas/sign-up';

export const signUp = async (prevState: unknown, formData: FormData) => {
  try {
    const { name, email, password } = signUpSchema.parse(
      Object.fromEntries(formData),
    );

    const passwordHash = await hash(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    const sessionToken = generateRandomToken();
    const sessionCookie = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, sessionCookie.expiresAt);

    return {
      success: true,
      message: 'Usuário criado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    if ((error as { code: string })['code'] === 'P2002') {
      return {
        success: false,
        message: 'Email já cadastrado',
        fieldErrors: undefined,
        payload: undefined,
      };
    }

    return formErrorHandler(error, formData);
  }
};
