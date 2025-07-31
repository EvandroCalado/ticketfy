'use server';

import { revalidatePath } from 'next/cache';

import { getAuth } from '@/actions/get-auth';
import { InitialActionsState } from '@/constants/initial-create-state';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { ticketPath } from '@/utils/paths';

import { createCommentSchema } from '../schemas/create-comment';

export const createComment = async (
  ticketId: string,
  prevState: InitialActionsState,
  formData: FormData,
) => {
  const { user } = await getAuth();

  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));

    await prisma.comment.create({
      data: {
        userId: user?.id,
        ticketId,
        ...data,
      },
    });

    revalidatePath(ticketPath(ticketId));

    return {
      status: 'success' as const,
      message: 'Comentário criado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
