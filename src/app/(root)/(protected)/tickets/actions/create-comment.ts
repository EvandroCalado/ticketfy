'use server';

import { revalidatePath } from 'next/cache';

import { getAuth } from '@/actions/get-auth';
import { ActionState } from '@/constants/action-state';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { ticketPath } from '@/utils/paths';

import { createCommentSchema } from '../schemas/create-comment';

export const createComment = async (
  ticketId: string,
  prevState: unknown,
  formData: FormData,
): Promise<ActionState> => {
  const { user } = await getAuth();

  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));

    await prisma.comment.create({
      data: {
        userId: user?.id,
        ticketId,
        ...data,
      },
      include: {
        user: true,
        ticket: true,
      },
    });

    revalidatePath(ticketPath(ticketId));

    return {
      success: true,
      message: 'Comentário criado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
