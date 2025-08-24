import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SESSION_COOKIE_NAME } from '@/constants/session-cookie-name';

// Mock next/headers
const mockSet = vi.fn();
const mockCookies = vi.fn();

vi.mock('next/headers', () => ({
  cookies: mockCookies,
}));

describe('deleteSessionCookie', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock setup
    mockCookies.mockResolvedValue({
      set: mockSet,
    });
  });

  it('should delete session cookie with correct attributes in development', async () => {
    vi.stubEnv('NODE_ENV', 'development');

    const { deleteSessionCookie } = await import('../delete-session-cookie');
    await deleteSessionCookie();

    expect(mockCookies).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith(SESSION_COOKIE_NAME, '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: 0,
    });
  });

  it('should delete session cookie with secure flag in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    const { deleteSessionCookie } = await import('../delete-session-cookie');
    await deleteSessionCookie();

    expect(mockSet).toHaveBeenCalledWith(SESSION_COOKIE_NAME, '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: 0,
    });
  });

  it('should handle cookies() errors', async () => {
    mockCookies.mockRejectedValue(new Error('Cookies error'));

    const { deleteSessionCookie } = await import('../delete-session-cookie');

    await expect(deleteSessionCookie()).rejects.toThrow('Cookies error');
  });

  it('should handle set() errors', async () => {
    mockCookies.mockResolvedValue({
      set: vi.fn().mockImplementation(() => {
        throw new Error('Set error');
      }),
    });

    const { deleteSessionCookie } = await import('../delete-session-cookie');

    await expect(deleteSessionCookie()).rejects.toThrow('Set error');
  });

  it('should use correct cookie name from constants', async () => {
    const { deleteSessionCookie } = await import('../delete-session-cookie');
    await deleteSessionCookie();

    expect(mockSet).toHaveBeenCalledWith(
      SESSION_COOKIE_NAME,
      expect.any(String),
      expect.any(Object),
    );
  });

  it('should set empty value and maxAge 0 for deletion', async () => {
    const { deleteSessionCookie } = await import('../delete-session-cookie');
    await deleteSessionCookie();

    const [name, value, attributes] = mockSet.mock.calls[0];

    expect(name).toBe(SESSION_COOKIE_NAME);
    expect(value).toBe('');
    expect(attributes).toHaveProperty('maxAge', 0);
  });

  it('should set all required cookie attributes for deletion', async () => {
    const { deleteSessionCookie } = await import('../delete-session-cookie');
    await deleteSessionCookie();

    const [, , attributes] = mockSet.mock.calls[0];

    expect(attributes).toHaveProperty('httpOnly', true);
    expect(attributes).toHaveProperty('sameSite', 'lax');
    expect(attributes).toHaveProperty('secure');
    expect(attributes).toHaveProperty('path', '/');
    expect(attributes).toHaveProperty('maxAge', 0);
  });

  it('should not have expires attribute when deleting', async () => {
    const { deleteSessionCookie } = await import('../delete-session-cookie');
    await deleteSessionCookie();

    const [, , attributes] = mockSet.mock.calls[0];

    expect(attributes).not.toHaveProperty('expires');
  });
});
