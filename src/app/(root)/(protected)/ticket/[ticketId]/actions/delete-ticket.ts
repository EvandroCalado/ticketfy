'use server';

import { redirect } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { InitialActionsState } from '@/constants/initial-create-state';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { signInPath } from '@/utils/paths';

export const deleteTicket = async (
  prevState: unknown,
  formData: FormData,
): Promise<InitialActionsState> => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  const ticketId = formData.get('ticketId') as string;

  if (!ticketId) {
    return {
      status: 'error',
      message: 'Ticket ID não encontrado',
      fieldErrors: undefined,
      payload: undefined,
    };
  }

  try {
    await prisma.ticket.delete({
      where: {
        id: ticketId,
        userId: user.id,
      },
    });

    return {
      status: 'success',
      message: 'Ticket excluído com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
