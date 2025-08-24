import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { User } from '@/generated/prisma';

// Mock the getAuth action
vi.mock('@/actions/get-auth');

describe('useAuth hook', () => {
  const mockUser: User = {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
    passwordHash: 'hashed-password',
    emailVerified: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  };

  let useAuth: () => readonly [User | null, boolean];
  let mockGetAuth: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Dynamic imports after mocking
    const authModule = await import('../use-auth');
    const getAuthModule = await import('@/actions/get-auth');

    useAuth = authModule.useAuth;
    mockGetAuth = vi.mocked(getAuthModule.getAuth);

    mockGetAuth.mockResolvedValue({ user: mockUser });
  });

  it('should initialize with null user and false isFetchUser', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current[0]).toBe(null);
    expect(result.current[1]).toBe(false);
  });

  it('should fetch user successfully and update state', async () => {
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current[1]).toBe(true); // isFetchUser should be true
    });

    expect(mockGetAuth).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toEqual(mockUser);
  });

  it('should handle getAuth returning null user', async () => {
    mockGetAuth.mockResolvedValue({ user: null });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current[1]).toBe(true); // isFetchUser should be true
    });

    expect(mockGetAuth).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(null);
  });

  it('should handle getAuth returning undefined user', async () => {
    mockGetAuth.mockResolvedValue({ user: undefined });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current[1]).toBe(true); // isFetchUser should be true
    });

    expect(mockGetAuth).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(undefined);
  });

  it('should handle getAuth error and set user to null', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const error = new Error('Auth failed');
    mockGetAuth.mockRejectedValue(error);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current[1]).toBe(true); // isFetchUser should be true
    });

    expect(mockGetAuth).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(null);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to fetch user:',
      error,
    );

    consoleErrorSpy.mockRestore();
  });

  it('should handle synchronous error from getAuth', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const syncError = new Error('Synchronous error');
    mockGetAuth.mockImplementation(() => {
      throw syncError;
    });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current[1]).toBe(true); // isFetchUser should be true
    });

    expect(mockGetAuth).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(null);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to fetch user:',
      syncError,
    );

    consoleErrorSpy.mockRestore();
  });

  it('should return a const assertion tuple', () => {
    const { result } = renderHook(() => useAuth());

    // Verify it returns a tuple with exactly 2 elements
    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current).toHaveLength(2);
  });

  it('should call fetchUser only once on mount', async () => {
    const { rerender } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(mockGetAuth).toHaveBeenCalledTimes(1);
    });

    // Rerender should not cause additional calls due to useCallback dependency array
    rerender();

    await waitFor(() => {
      expect(mockGetAuth).toHaveBeenCalledTimes(1);
    });
  });

  it('should maintain referential stability with useCallback', async () => {
    const { rerender } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(mockGetAuth).toHaveBeenCalledTimes(1);
    });

    // Rerender multiple times - should not cause additional getAuth calls
    rerender();
    rerender();
    rerender();

    // Since we can't easily access the internal fetchUser function,
    // we'll verify the behavior indirectly by checking that getAuth
    // is only called once despite rerenders
    expect(mockGetAuth).toHaveBeenCalledTimes(1);
  });

  it('should set isFetchUser to true in finally block regardless of success or error', async () => {
    // Test success case
    const { result: successResult } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(successResult.current[1]).toBe(true);
    });

    // Test error case
    mockGetAuth.mockRejectedValue(new Error('Test error'));
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { result: errorResult } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(errorResult.current[1]).toBe(true);
    });

    consoleErrorSpy.mockRestore();
  });

  it('should handle getAuth returning object without user property', async () => {
    mockGetAuth.mockResolvedValue({} as unknown);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current[1]).toBe(true); // isFetchUser should be true
    });

    expect(mockGetAuth).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(undefined);
  });

  it('should handle getAuth returning non-object value', async () => {
    mockGetAuth.mockResolvedValue(null as unknown);
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current[1]).toBe(true); // isFetchUser should be true
    });

    expect(mockGetAuth).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(null);

    consoleErrorSpy.mockRestore();
  });
});
