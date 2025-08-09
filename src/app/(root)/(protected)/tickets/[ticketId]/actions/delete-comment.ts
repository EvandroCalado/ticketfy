'use server';

import { revalidatePath } from 'next/cache';

import { getAuth } from '@/actions/get-auth';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { ticketPath } from '@/utils/paths';

export const deleteComment = async (commentId: string) => {
  const { user } = await getAuth();

  const comment = await prisma.comment.findUnique({
    where: { id: commentId, userId: user?.id },
  });

  if (!comment) {
    return {
      success: false,
      message: 'Você não tem permissão para excluir este comentário',
      fieldErrors: undefined,
      payload: undefined,
    };
  }

  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });

    revalidatePath(ticketPath(comment.ticketId));

    return {
      success: true,
      message: 'Comentário excluído com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error);
  }
};
