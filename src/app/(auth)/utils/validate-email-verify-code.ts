'use server';

import { prisma } from '@/lib/prisma';

export const validateEmailVerifyCode = async (
  userId: string,
  email: string,
  code: string,
) => {
  const emailVerificationToken = await prisma.emailVerificationToken.findFirst({
    where: { userId, email, code },
  });

  if (!emailVerificationToken) {
    return false;
  }

  await prisma.emailVerificationToken.delete({
    where: { id: emailVerificationToken.id },
  });

  console.log(emailVerificationToken);

  const isExpired = Date.now() > emailVerificationToken.expiresAt.getTime();

  if (isExpired) {
    return false;
  }

  return true;
};
