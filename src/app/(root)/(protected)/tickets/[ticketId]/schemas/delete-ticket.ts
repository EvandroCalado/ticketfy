import z from 'zod';

export const deleteTicketSchema = z.object({
  ticketId: z.string(),
});

export type DeleteTicketSchema = z.infer<typeof deleteTicketSchema>;
