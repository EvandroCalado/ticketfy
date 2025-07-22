'use server';

import { cookies } from 'next/headers';

import { SESSION_COOKIE_NAME } from '@/constants/session-cookie-name';

export const setSessionCookie = async (
  sessionToken: string,
  expiresAt: Date,
) => {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    attributes: {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: expiresAt,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};
