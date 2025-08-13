import { describe, expect, it, vi } from 'vitest';

// Mock Prisma
vi.mock('../prisma', () => ({
  prisma: {
    session: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

// Mock hash-token
vi.mock('@/utils/hash-token', () => ({
  hashToken: vi.fn().mockReturnValue('hashed-token'),
}));

describe('auth functions', () => {
  it('should export createSession function', async () => {
    const { createSession } = await import('../auth');
    expect(typeof createSession).toBe('function');
  });

  it('should export validateSession function', async () => {
    const { validateSession } = await import('../auth');
    expect(typeof validateSession).toBe('function');
  });

  it('should export invalidateSession function', async () => {
    const { invalidateSession } = await import('../auth');
    expect(typeof invalidateSession).toBe('function');
  });

  // it('should call prisma.session.create in createSession', async () => {
  //   const { createSession } = await import('../auth');
  //   const { prisma } = await import('../prisma');

  //   prisma.session.create.mockResolvedValue({
  //     id: 'hashed-token',
  //     userId: 'user-id',
  //     expiresAt: new Date(),
  //   });

  //   await createSession('session-token', 'user-id');

  //   expect(prisma.session.create).toHaveBeenCalled();
  // });
});
