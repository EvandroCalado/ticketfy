'use server';

import { revalidatePath } from 'next/cache';

import { getAuth } from '@/actions/get-auth';
import { InitialActionsState } from '@/constants/initial-create-state';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { ticketPath } from '@/utils/paths';

export const deleteComment = async (
  commentId: string,
  prevState: InitialActionsState,
  formData: FormData,
) => {
  const { user } = await getAuth();

  const comment = await prisma.comment.findUnique({
    where: { id: commentId, userId: user?.id },
  });

  if (!comment) {
    return {
      status: 'error' as const,
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
      status: 'success' as const,
      message: 'Comentário excluído com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
