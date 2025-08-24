import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SESSION_COOKIE_NAME } from '@/constants/session-cookie-name';

// Mock next/headers
const mockSet = vi.fn();
const mockCookies = vi.fn();

vi.mock('next/headers', () => ({
  cookies: mockCookies,
}));

// Mock process.env
const originalEnv = process.env;

describe('setSessionCookie', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };

    // Default mock setup
    mockCookies.mockResolvedValue({
      set: mockSet,
    });
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should set session cookie with correct attributes in development', async () => {
    vi.stubEnv('NODE_ENV', 'development');

    const sessionToken = 'test-session-token';
    const expiresAt = new Date('2024-12-31T23:59:59Z');

    const { setSessionCookie } = await import('../set-session-cookie');
    await setSessionCookie(sessionToken, expiresAt);

    expect(mockCookies).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      expires: expiresAt,
    });
  });

  it('should set session cookie with secure flag in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    const sessionToken = 'test-session-token';
    const expiresAt = new Date('2024-12-31T23:59:59Z');

    const { setSessionCookie } = await import('../set-session-cookie');
    await setSessionCookie(sessionToken, expiresAt);

    expect(mockSet).toHaveBeenCalledWith(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      expires: expiresAt,
    });
  });

  it('should handle cookies() errors', async () => {
    mockCookies.mockRejectedValue(new Error('Cookies error'));

    const { setSessionCookie } = await import('../set-session-cookie');

    await expect(setSessionCookie('token', new Date())).rejects.toThrow(
      'Cookies error',
    );
  });

  it('should handle set() errors', async () => {
    mockCookies.mockResolvedValue({
      set: vi.fn().mockImplementation(() => {
        throw new Error('Set error');
      }),
    });

    const { setSessionCookie } = await import('../set-session-cookie');

    await expect(setSessionCookie('token', new Date())).rejects.toThrow(
      'Set error',
    );
  });

  it('should use correct cookie name from constants', async () => {
    const sessionToken = 'test-token';
    const expiresAt = new Date();

    const { setSessionCookie } = await import('../set-session-cookie');
    await setSessionCookie(sessionToken, expiresAt);

    expect(mockSet).toHaveBeenCalledWith(
      SESSION_COOKIE_NAME,
      expect.any(String),
      expect.any(Object),
    );
  });

  it('should set all required cookie attributes', async () => {
    const sessionToken = 'test-token';
    const expiresAt = new Date();

    const { setSessionCookie } = await import('../set-session-cookie');
    await setSessionCookie(sessionToken, expiresAt);

    const [, , attributes] = mockSet.mock.calls[0];

    expect(attributes).toHaveProperty('httpOnly', true);
    expect(attributes).toHaveProperty('sameSite', 'lax');
    expect(attributes).toHaveProperty('secure');
    expect(attributes).toHaveProperty('path', '/');
    expect(attributes).toHaveProperty('expires', expiresAt);
  });

  it('should handle empty session token', async () => {
    const sessionToken = '';
    const expiresAt = new Date();

    const { setSessionCookie } = await import('../set-session-cookie');
    await setSessionCookie(sessionToken, expiresAt);

    expect(mockSet).toHaveBeenCalledWith(
      SESSION_COOKIE_NAME,
      '',
      expect.any(Object),
    );
  });
});
