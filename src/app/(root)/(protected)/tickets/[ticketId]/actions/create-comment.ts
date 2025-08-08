'use server';

import { revalidatePath } from 'next/cache';

import { getAuth } from '@/actions/get-auth';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { ticketPath } from '@/utils/paths';

import {
  CreateCommentSchema,
  createCommentSchema,
} from '../schemas/create-comment';

export const createComment = async (
  ticketId: string,
  data: CreateCommentSchema,
) => {
  const { user } = await getAuth();

  try {
    const insertedData = createCommentSchema.parse(data);

    await prisma.comment.create({
      data: {
        userId: user?.id,
        ticketId,
        ...insertedData,
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
    };
  } catch (error) {
    return formErrorHandler(error);
  }
};
