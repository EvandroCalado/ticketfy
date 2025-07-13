'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/utils/paths';

export const createTicket = async (formData: FormData) => {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  await prisma.ticket.create({ data });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
