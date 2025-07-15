'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { ticketsPath } from '@/utils/paths';

import { CreateTicketState } from '../constants/initial-create-state';
import { createTicketSchema } from '../schemas/create-ticket';

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
