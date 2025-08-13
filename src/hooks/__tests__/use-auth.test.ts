import { describe, expect, it, vi } from 'vitest';

// Mock dependencies
vi.mock('@/actions/get-auth', () => ({
  getAuth: vi.fn().mockResolvedValue({
    user: { id: 'test-user', name: 'Test User' },
  }),
}));

// Mock React hooks
vi.mock('react', () => ({
  useState: vi.fn().mockImplementation(initial => [initial, vi.fn()]),
  useEffect: vi.fn().mockImplementation(fn => fn()),
  useCallback: vi.fn().mockImplementation(fn => fn),
}));

describe('use-auth hook', () => {
  it('should export useAuth function', async () => {
    const { useAuth } = await import('../use-auth');
    expect(typeof useAuth).toBe('function');
  });

  it('should return user and isFetchUser', async () => {
    const { useAuth } = await import('../use-auth');
    const result = useAuth();

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
  });
});
