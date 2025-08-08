'use server';

import { redirect } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { signInPath } from '@/utils/paths';

import { deleteTicketSchema } from '../schemas/delete-ticket';

export const deleteTicket = async (ticketId: string) => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  const data = deleteTicketSchema.parse({ ticketId });

  try {
    await prisma.ticket.delete({
      where: {
        id: data.ticketId,
        userId: user.id,
      },
    });

    return {
      success: true,
      message: 'Ticket excluído com sucesso',
    };
  } catch (error) {
    return formErrorHandler(error);
  }
};
