import { describe, expect, it, vi } from 'vitest';

// Mock argon2 first
vi.mock('@node-rs/argon2', () => ({
  verify: vi.fn().mockResolvedValue(true),
}));

describe('verify-password', () => {
  it('should export verifyPassword function', async () => {
    const { verifyPassword } = await import('../verify-password');
    expect(typeof verifyPassword).toBe('function');
  });

  it('should call argon2 verify when invoked', async () => {
    const { verifyPassword } = await import('../verify-password');
    const { verify } = await import('@node-rs/argon2');

    await verifyPassword('hash', 'password');

    expect(verify).toHaveBeenCalledWith('hash', 'password');
  });
});
