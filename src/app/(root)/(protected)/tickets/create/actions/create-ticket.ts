'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { toCent } from '@/utils/format-currency';
import { signInPath, ticketsPath } from '@/utils/paths';

import {
  CreateTicketSchema,
  createTicketSchema,
} from '../schemas/create-ticket';

export const createTicket = async (data: CreateTicketSchema) => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  try {
    const insertedData = createTicketSchema.parse(data);

    const dbData = {
      ...insertedData,
      bounty: toCent(insertedData.bounty),
      userId: user.id,
    };

    await prisma.ticket.create({ data: dbData });

    revalidatePath(ticketsPath());

    return {
      success: true,
      message: 'Ticket criado com sucesso',
    };
  } catch (error) {
    return formErrorHandler(error);
  }
};
