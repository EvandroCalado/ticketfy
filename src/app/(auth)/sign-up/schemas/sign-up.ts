import { z } from 'zod';

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Usuário deve ter pelo menos 3 caracteres')
      .refine(value => !value.includes(' '), 'Usuário não pode ter espaços'),
    email: z.email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
