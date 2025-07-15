'use server';

import { revalidatePath } from 'next/cache';

import z from 'zod';

import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { ticketPath } from '@/utils/paths';

import { CreateTicketState } from '../../../create/constants/initial-create-state';
import { TicketStatus } from '/prisma/index';

const updateTicketSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  content: z
    .string()
    .min(10, 'Conteúdo deve ter pelo menos 10 caracteres')
    .max(1024, 'Conteúdo deve ter no máximo 1024 caracteres'),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'DONE']),
});

export const updateTicket = async (
  id: string,
  formData: FormData,
): Promise<CreateTicketState> => {
  try {
    const data = updateTicketSchema.parse({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      status: formData.get('status') as TicketStatus,
    });

    await prisma.ticket.update({
      where: { id },
      data,
    });

    revalidatePath(ticketPath(id));

    return {
      status: 'success',
      message: 'Ticket atualizado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
