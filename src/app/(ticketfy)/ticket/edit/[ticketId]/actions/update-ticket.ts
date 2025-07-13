'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';

import { TicketStatus } from '/prisma/index';

export const updateTicket = async (id: string, formData: FormData) => {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    status: formData.get('status') as TicketStatus,
  };

  await prisma.ticket.update({
    where: { id },
    data,
  });

  revalidatePath(`/ticket/${id}`);
  redirect(`/ticket/${id}`);
};
