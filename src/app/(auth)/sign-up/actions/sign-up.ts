'use server';

import { hash } from '@node-rs/argon2';

import { setSessionCookie } from '@/actions/set-session-cookie';
import { Prisma } from '@/generated/prisma';
import { createSession } from '@/lib/oslo';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { generateRandomToken } from '@/utils/generate-random-token';

import { SignUpSchema, signUpSchema } from '../schemas/sign-up';

export const signUp = async (data: SignUpSchema) => {
  try {
    const { name, email, password } = signUpSchema.parse(data);

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
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        success: false,
        message: 'Email já cadastrado',
      };
    }

    return formErrorHandler(error);
  }
};
