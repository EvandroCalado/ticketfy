'use server';

import { cookies } from 'next/headers';

import { SESSION_COOKIE_NAME } from '@/constants/session-cookie-name';

export const deleteSessionCookie = async () => {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: '',
    attributes: {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};
