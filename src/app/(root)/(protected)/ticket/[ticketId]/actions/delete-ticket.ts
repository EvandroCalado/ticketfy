'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { signInPath, ticketsPath } from '@/utils/paths';

export const deleteTicket = async (ticketId: string) => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  try {
    await prisma.ticket.delete({
      where: {
        id: ticketId,
        userId: user.id,
      },
    });
  } catch (error) {
    return formErrorHandler(error);
  }

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
