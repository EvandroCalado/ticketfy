import { prisma } from '@/lib/prisma';
import { generateRandomToken } from '@/utils/generate-random-token';
import { getBaseUrl } from '@/utils/get-base-url';
import { hashToken } from '@/utils/hash-token';
import { resetPasswordPath } from '@/utils/paths';

import { PASSWORD_RESET_TOKEN_LIFETIME_MS } from '../constants/password-reset-token-lifetime-ms';

export const generatePasswordResetLink = async (userId: string) => {
  const tokenId = generateRandomToken();
  const tokenHash = hashToken(tokenId);

  await prisma.passwordResetToken.create({
    data: {
      tokenHash,
      expiresAt: new Date(Date.now() + PASSWORD_RESET_TOKEN_LIFETIME_MS),
      userId,
    },
  });

  const passwordResetLink = getBaseUrl() + resetPasswordPath() + `/${tokenId}`;

  return passwordResetLink;
};
