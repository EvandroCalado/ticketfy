'use server';

import { revalidatePath } from 'next/cache';

import z from 'zod';

import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { ticketsPath } from '@/utils/paths';

import { CreateTicketState } from '../constants/initial-create-state';

const createTicketSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  content: z
    .string()
    .min(10, 'Conteúdo deve ter pelo menos 10 caracteres')
    .max(1024, 'Conteúdo deve ter no máximo 1024 caracteres'),
});

export const createTicket = async (
  prevState: unknown,
  formData: FormData,
): Promise<CreateTicketState> => {
  try {
    const data = createTicketSchema.parse({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    });

    await prisma.ticket.create({ data });

    revalidatePath(ticketsPath());

    return {
      status: 'success',
      message: 'Ticket criado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
