'use server';

import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { hashToken } from '@/utils/hash-token';

import { resetPasswordSchema } from '../schemas/reset-password';
import { hashPassword } from '../utils/hash-password';

export const resetPassword = async (
  tokenId: string,
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const { password } = resetPasswordSchema.parse(
      Object.fromEntries(formData),
    );

    const tokenHash = hashToken(tokenId);

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (passwordResetToken) {
      await prisma.passwordResetToken.delete({
        where: { tokenHash },
      });
    }

    if (
      !passwordResetToken ||
      Date.now() > passwordResetToken.expiresAt.getTime()
    ) {
      return {
        success: false,
        message: 'Token inválido ou expirado',
        fieldErrors: undefined,
        payload: undefined,
      };
    }

    // TODO: delete passwordResetToken from this user

    await prisma.session.deleteMany({
      where: { userId: passwordResetToken.userId },
    });

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: { id: passwordResetToken.userId },
      data: { passwordHash },
    });

    return {
      success: true,
      message: 'Senha redefinida com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
