'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/utils/paths';

export const deleteTicket = async (ticketId: string) => {
  await prisma.ticket.delete({
    where: {
      id: ticketId,
    },
  });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
