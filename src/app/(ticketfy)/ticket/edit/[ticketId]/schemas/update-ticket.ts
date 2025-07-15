import z from 'zod';

export const updateTicketSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  content: z
    .string()
    .min(10, 'Conteúdo deve ter pelo menos 10 caracteres')
    .max(1024, 'Conteúdo deve ter no máximo 1024 caracteres'),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'DONE']),
});
