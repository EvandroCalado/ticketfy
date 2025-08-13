import { describe, expect, it, vi } from 'vitest';

// Mock Next.js cookies
vi.mock('next/headers', () => ({
  cookies: vi.fn().mockReturnValue({
    set: vi.fn(),
  }),
}));

describe('set-session-cookie', () => {
  it('should export setSessionCookie function', async () => {
    const { setSessionCookie } = await import('../set-session-cookie');
    expect(typeof setSessionCookie).toBe('function');
  });

  it('should call cookies.set when invoked', async () => {
    const { setSessionCookie } = await import('../set-session-cookie');
    const { cookies } = await import('next/headers');
    const mockCookies = await cookies();

    const expiresAt = new Date(Date.now() + 86400000); // 1 day from now
    await setSessionCookie('test-token', expiresAt);

    expect(mockCookies.set).toHaveBeenCalled();
  });
});
