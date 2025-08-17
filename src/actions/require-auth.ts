'use server';

import { redirect } from 'next/navigation';

import { signInPath, verifyEmailPath } from '@/utils/paths';

import { getAuth } from './get-auth';

/**
 * Função para garantir que o usuário está autenticado e com email verificado
 * Redireciona automaticamente se não estiver
 */
export const requireAuth = async () => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  if (!user.emailVerified) redirect(verifyEmailPath());

  return { user };
};

/**
 * Função para garantir que o usuário está autenticado (sem verificar email)
 * Útil para rotas como verificação de email onde o usuário pode não ter verificado ainda
 */
export const requireAuthOnly = async () => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  return { user };
};
