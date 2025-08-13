import { describe, expect, it, vi } from 'vitest';

// Mock Next.js cookies
const mockSet = vi.fn();
vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue({
    set: mockSet,
  }),
}));

describe('delete-session-cookie', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export deleteSessionCookie function', async () => {
    const { deleteSessionCookie } = await import('../delete-session-cookie');
    expect(typeof deleteSessionCookie).toBe('function');
  });

  it('should call cookies.set when invoked', async () => {
    const { deleteSessionCookie } = await import('../delete-session-cookie');

    await deleteSessionCookie();

    expect(mockSet).toHaveBeenCalled();
  });
});
