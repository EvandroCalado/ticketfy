import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SESSION_COOKIE_NAME } from '@/constants/session-cookie-name';

// Mock next/headers
const mockCookies = vi.fn();
vi.mock('next/headers', () => ({
  cookies: mockCookies,
}));

// Mock react cache
vi.mock('react', () => ({
  cache: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
}));

// Mock validateSession
const mockValidateSession = vi.fn();
vi.mock('@/lib/auth', () => ({
  validateSession: mockValidateSession,
}));

describe('getAuth', () => {
  const mockUser = {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
    passwordHash: 'hashed-password',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockSession = {
    id: 'session-123',
    userId: 'user-123',
    expiresAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null user and session when no session cookie exists', async () => {
    mockCookies.mockResolvedValue({
      get: vi.fn().mockReturnValue(undefined),
    });

    const { getAuth } = await import('../get-auth');
    const result = await getAuth();

    expect(result).toEqual({
      user: null,
      session: null,
    });
    expect(mockValidateSession).not.toHaveBeenCalled();
  });

  it('should return null user and session when session cookie value is null', async () => {
    mockCookies.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: null }),
    });

    const { getAuth } = await import('../get-auth');
    const result = await getAuth();

    expect(result).toEqual({
      user: null,
      session: null,
    });
    expect(mockValidateSession).not.toHaveBeenCalled();
  });

  it('should return null user and session when session cookie value is undefined', async () => {
    mockCookies.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: undefined }),
    });

    const { getAuth } = await import('../get-auth');
    const result = await getAuth();

    expect(result).toEqual({
      user: null,
      session: null,
    });
    expect(mockValidateSession).not.toHaveBeenCalled();
  });

  it('should validate session and return user when session cookie exists', async () => {
    const sessionToken = 'valid-session-token';
    const mockGet = vi.fn().mockReturnValue({ value: sessionToken });

    mockCookies.mockResolvedValue({
      get: mockGet,
    });

    mockValidateSession.mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    const { getAuth } = await import('../get-auth');
    const result = await getAuth();

    expect(mockGet).toHaveBeenCalledWith(SESSION_COOKIE_NAME);
    expect(mockValidateSession).toHaveBeenCalledWith(sessionToken);
    expect(result).toEqual({
      user: mockUser,
      session: mockSession,
    });
  });

  it('should return null when validateSession returns null', async () => {
    const sessionToken = 'invalid-session-token';
    mockCookies.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: sessionToken }),
    });

    mockValidateSession.mockResolvedValue({
      user: null,
      session: null,
    });

    const { getAuth } = await import('../get-auth');
    const result = await getAuth();

    expect(mockValidateSession).toHaveBeenCalledWith(sessionToken);
    expect(result).toEqual({
      user: null,
      session: null,
    });
  });

  it('should handle validateSession errors', async () => {
    const sessionToken = 'error-session-token';
    mockCookies.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: sessionToken }),
    });

    mockValidateSession.mockRejectedValue(new Error('Validation failed'));

    const { getAuth } = await import('../get-auth');

    await expect(getAuth()).rejects.toThrow('Validation failed');
  });

  it('should handle cookies() errors', async () => {
    mockCookies.mockRejectedValue(new Error('Cookies error'));

    const { getAuth } = await import('../get-auth');

    await expect(getAuth()).rejects.toThrow('Cookies error');
  });

  it('should use correct cookie name', async () => {
    const getCookieMock = vi.fn().mockReturnValue(undefined);
    mockCookies.mockResolvedValue({
      get: getCookieMock,
    });

    const { getAuth } = await import('../get-auth');
    await getAuth();

    expect(getCookieMock).toHaveBeenCalledWith(SESSION_COOKIE_NAME);
  });
});
