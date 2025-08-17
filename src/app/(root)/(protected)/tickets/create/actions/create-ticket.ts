'use server';

import { revalidatePath } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { toCent } from '@/utils/format-currency';
import { ticketsPath } from '@/utils/paths';

import { createTicketSchema } from '../schemas/create-ticket';

export const createTicket = async (prevState: unknown, formData: FormData) => {
  const { user } = await requireAuth();

  try {
    const insertedData = createTicketSchema.parse(Object.fromEntries(formData));

    const dbData = {
      ...insertedData,
      bounty: Number(toCent(insertedData.bounty)),
      userId: user.id,
    };

    await prisma.ticket.create({ data: dbData });

    revalidatePath(ticketsPath());

    return {
      success: true,
      message: 'Ticket criado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
