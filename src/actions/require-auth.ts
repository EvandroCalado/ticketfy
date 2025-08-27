'use server';

import { redirect } from 'next/navigation';

import { getOrganizationByUser } from '@/app/(root)/(protected)/organizations/actions/get-organization-by-user';
import {
  onboardingPath,
  selectActiveOrganizationPath,
  signInPath,
  verifyEmailPath,
} from '@/utils/paths';

import { getAuth } from './get-auth';

/**
 * Função para garantir que o usuário está autenticado e com email verificado
 * Redireciona automaticamente se não estiver
 */

type RequireAuthOptions = {
  checkEmailVerified?: boolean;
  checkOrganization?: boolean;
  checkActiveOrganization?: boolean;
};

export const requireAuth = async (options?: RequireAuthOptions) => {
  const {
    checkEmailVerified = true,
    checkOrganization = true,
    checkActiveOrganization = true,
  } = options || {};

  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  if (checkEmailVerified && !user.emailVerified) {
    redirect(verifyEmailPath());
  }

  if (checkOrganization || checkActiveOrganization) {
    const organizations = await getOrganizationByUser();

    if (checkOrganization && !organizations.length) {
      redirect(onboardingPath());
    }

    const hasActiveOrganization = organizations.find(
      organization => organization.membershipByUser.isActive,
    );

    if (checkActiveOrganization && !hasActiveOrganization) {
      redirect(selectActiveOrganizationPath());
    }
  }

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
