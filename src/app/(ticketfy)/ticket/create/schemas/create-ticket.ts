import z from 'zod';

export const createTicketSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  content: z
    .string()
    .min(10, 'Conteúdo deve ter pelo menos 10 caracteres')
    .max(1024, 'Conteúdo deve ter no máximo 1024 caracteres'),
  deadline: z.string().regex(/\d{4}-\d{2}-\d{2}/, 'Data inválida'),
  bounty: z.number().positive('Bônus deve ser maior que 0'),
});
