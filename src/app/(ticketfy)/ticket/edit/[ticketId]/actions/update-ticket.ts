'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { formErrorHandler } from '@/utils/form-error-handler';
import { ticketPath } from '@/utils/paths';

import { CreateTicketState } from '../../../create/constants/initial-create-state';
import { updateTicketSchema } from '../schemas/update-ticket';
import { TicketStatus } from '/prisma/index';

export const updateTicket = async (
  id: string,
  formData: FormData,
): Promise<CreateTicketState> => {
  try {
    const data = updateTicketSchema.parse({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      status: formData.get('status') as TicketStatus,
    });

    await prisma.ticket.update({
      where: { id },
      data,
    });
  } catch (error) {
    return formErrorHandler(error, formData);
  }

  revalidatePath(ticketPath(id));
  redirect(ticketPath(id));
};
