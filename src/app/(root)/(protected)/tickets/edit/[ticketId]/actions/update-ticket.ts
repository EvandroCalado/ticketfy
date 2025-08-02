'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { InitialActionsState } from '@/constants/initial-create-state';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { toCent } from '@/utils/format-currency';
import { signInPath, ticketPath, ticketsPath } from '@/utils/paths';

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

    const isTicketOwner = await prisma.ticket.findFirst({
      where: { id, userId: user.id },
    });

    if (!isTicketOwner)
      return {
        status: 'error',
        message: 'Você não tem permissão para atualizar este ticket',
        fieldErrors: undefined,
        payload: undefined,
      };

    await prisma.ticket.update({
      where: { id },
      data: {
        ...data,
        bounty: toCent(data.bounty),
      },
    });

    revalidatePath(ticketPath(id));
    revalidatePath(ticketsPath());

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
