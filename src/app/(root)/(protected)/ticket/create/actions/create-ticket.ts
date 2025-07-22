'use server';

import { redirect } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { InitialActionsState } from '@/constants/initial-create-state';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { toCent } from '@/utils/format-currency';
import { signInPath } from '@/utils/paths';

import { createTicketSchema } from '../schemas/create-ticket';

export const createTicket = async (
  prevState: unknown,
  formData: FormData,
): Promise<InitialActionsState> => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  try {
    const data = createTicketSchema.parse(Object.fromEntries(formData));

    const dbData = {
      ...data,
      bounty: toCent(data.bounty),
      userId: user.id,
    };

    await prisma.ticket.create({ data: dbData });

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
