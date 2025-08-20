'use server';

import { prisma } from '@/lib/prisma';
import { generateRandomCode } from '@/utils/generate-random-code';

import { EMAIL_VERIFICATION_TOKEN_LIFETIME_MS } from '../constants/email-verification-token-lifetime-ms';

export const generateEmailVerificationCode = async (
  userId: string,
  email: string,
) => {
  await prisma.emailVerificationToken.deleteMany({
    where: {
      userId,
    },
  });

  const code = generateRandomCode();

  await prisma.emailVerificationToken.create({
    data: {
      code,
      userId,
      email,
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_LIFETIME_MS),
    },
  });

  return code;
};
