import { describe, expect, it, vi } from 'vitest';

// Mock all dependencies
vi.mock('../get-auth', () => ({
  getAuth: vi.fn().mockResolvedValue({
    session: { id: 'test-session-id' },
    user: { id: 'test-user-id' },
  }),
}));

vi.mock('@/lib/auth', () => ({
  invalidateSession: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../delete-session-cookie', () => ({
  deleteSessionCookie: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('sign-out', () => {
  it('should export signOut function', async () => {
    const { signOut } = await import('../sign-out');
    expect(typeof signOut).toBe('function');
  });

  it('should be able to call signOut without errors', async () => {
    const { signOut } = await import('../sign-out');

    // Just test that it can be called without throwing
    await expect(signOut()).resolves.not.toThrow();
  });
});
