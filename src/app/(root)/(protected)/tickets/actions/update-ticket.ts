'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { ActionState } from '@/constants/action-state';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { toCent } from '@/utils/format-currency';
import { signInPath, ticketPath, ticketsPath } from '@/utils/paths';

import { updateTicketSchema } from '../schemas/update-ticket';

export const updateTicket = async (
  id: string,
  prevState: unknown,
  formData: FormData,
): Promise<ActionState> => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  try {
    const updatedData = updateTicketSchema.parse(Object.fromEntries(formData));

    const isTicketOwner = await prisma.ticket.findFirst({
      where: { id, userId: user.id },
    });

    if (!isTicketOwner)
      return {
        success: false,
        message: 'Você não tem permissão para atualizar este ticket',
      };

    await prisma.ticket.update({
      where: { id },
      data: {
        ...updatedData,
        bounty: Number(toCent(updatedData.bounty)),
      },
    });

    revalidatePath(ticketPath(id));
    revalidatePath(ticketsPath());

    return {
      success: true,
      message: 'Ticket atualizado com sucesso',
      payload: undefined,
      fieldErrors: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
