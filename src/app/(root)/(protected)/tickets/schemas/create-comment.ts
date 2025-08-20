import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Conteúdo obrigatório')
    .max(1024, 'Máximo de 1024 caracteres'),
});
