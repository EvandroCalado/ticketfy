'use server';

import { redirect } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { InitialActionsState } from '@/constants/initial-create-state';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { toCent } from '@/utils/format-currency';
import { signInPath } from '@/utils/paths';

import { updateTicketSchema } from '../schemas/update-ticket';

export const updateTicket = async (
  id: string,
  formData: FormData,
): Promise<InitialActionsState> => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  try {
    const data = updateTicketSchema.parse({
      ...Object.fromEntries(formData),
      bounty: Number(formData.get('bounty')),
    });

    await prisma.ticket.update({
      where: { id, userId: user.id },
      data: {
        ...data,
        bounty: toCent(data.bounty),
      },
    });

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
