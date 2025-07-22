'use server';

import { redirect } from 'next/navigation';

import { invalidateSession } from '@/lib/oslo';
import { signInPath } from '@/utils/paths';

import { deleteSessionCookie } from './delete-session-cookie';
import { getAuth } from './get-auth';

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) redirect(signInPath());

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect(signInPath());
};
