import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock next/navigation
const mockRedirect = vi.fn(() => {
  throw new Error('REDIRECT'); // Simulate redirect behavior
});
vi.mock('next/navigation', () => ({
  redirect: mockRedirect,
}));

// Mock getAuth
const mockGetAuth = vi.fn();
vi.mock('../get-auth', () => ({
  getAuth: mockGetAuth,
}));

// Mock paths
const mockSignInPath = vi.fn(() => '/sign-in');
const mockVerifyEmailPath = vi.fn(() => '/verify-email');
vi.mock('@/utils/paths', () => ({
  signInPath: mockSignInPath,
  verifyEmailPath: mockVerifyEmailPath,
}));

describe('require-auth', () => {
  const mockUser = {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
    passwordHash: 'hashed-password',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUnverifiedUser = {
    ...mockUser,
    emailVerified: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('requireAuth', () => {
    it('should redirect to sign-in when user is null', async () => {
      mockGetAuth.mockResolvedValue({ user: null, session: null });

      const { requireAuth } = await import('../require-auth');

      await expect(requireAuth()).rejects.toThrow('REDIRECT');
      expect(mockRedirect).toHaveBeenCalledWith('/sign-in');
      expect(mockSignInPath).toHaveBeenCalled();
    });

    it('should redirect to verify-email when user email is not verified', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUnverifiedUser,
        session: { id: 'session-123' },
      });

      const { requireAuth } = await import('../require-auth');

      await expect(requireAuth()).rejects.toThrow('REDIRECT');
      expect(mockRedirect).toHaveBeenCalledWith('/verify-email');
      expect(mockVerifyEmailPath).toHaveBeenCalled();
    });

    it('should return user when authenticated and email verified', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUser,
        session: { id: 'session-123' },
      });

      const { requireAuth } = await import('../require-auth');
      const result = await requireAuth();

      expect(mockRedirect).not.toHaveBeenCalled();
      expect(result).toEqual({ user: mockUser });
    });

    it('should handle getAuth errors', async () => {
      mockGetAuth.mockRejectedValue(new Error('Auth error'));

      const { requireAuth } = await import('../require-auth');

      await expect(requireAuth()).rejects.toThrow('Auth error');
    });

    it('should redirect to sign-in when user is undefined', async () => {
      mockGetAuth.mockResolvedValue({ user: undefined, session: null });

      const { requireAuth } = await import('../require-auth');

      await expect(requireAuth()).rejects.toThrow('REDIRECT');
      expect(mockRedirect).toHaveBeenCalledWith('/sign-in');
    });

    it('should handle user with emailVerified as false explicitly', async () => {
      const userWithFalseEmail = {
        ...mockUser,
        emailVerified: false,
      };

      mockGetAuth.mockResolvedValue({
        user: userWithFalseEmail,
        session: { id: 'session-123' },
      });

      const { requireAuth } = await import('../require-auth');

      await expect(requireAuth()).rejects.toThrow('REDIRECT');
      expect(mockRedirect).toHaveBeenCalledWith('/verify-email');
    });
  });

  describe('requireAuthOnly', () => {
    it('should redirect to sign-in when user is null', async () => {
      mockGetAuth.mockResolvedValue({ user: null, session: null });

      const { requireAuthOnly } = await import('../require-auth');

      await expect(requireAuthOnly()).rejects.toThrow('REDIRECT');
      expect(mockRedirect).toHaveBeenCalledWith('/sign-in');
      expect(mockSignInPath).toHaveBeenCalled();
    });

    it('should return user when authenticated (regardless of email verification)', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUnverifiedUser,
        session: { id: 'session-123' },
      });

      const { requireAuthOnly } = await import('../require-auth');
      const result = await requireAuthOnly();

      expect(mockRedirect).not.toHaveBeenCalled();
      expect(result).toEqual({ user: mockUnverifiedUser });
    });

    it('should return verified user when authenticated', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUser,
        session: { id: 'session-123' },
      });

      const { requireAuthOnly } = await import('../require-auth');
      const result = await requireAuthOnly();

      expect(mockRedirect).not.toHaveBeenCalled();
      expect(result).toEqual({ user: mockUser });
    });

    it('should handle getAuth errors', async () => {
      mockGetAuth.mockRejectedValue(new Error('Auth error'));

      const { requireAuthOnly } = await import('../require-auth');

      await expect(requireAuthOnly()).rejects.toThrow('Auth error');
    });

    it('should redirect to sign-in when user is undefined', async () => {
      mockGetAuth.mockResolvedValue({ user: undefined, session: null });

      const { requireAuthOnly } = await import('../require-auth');

      await expect(requireAuthOnly()).rejects.toThrow('REDIRECT');
      expect(mockRedirect).toHaveBeenCalledWith('/sign-in');
    });
  });

  describe('path functions', () => {
    it('should call signInPath function for redirect', async () => {
      mockGetAuth.mockResolvedValue({ user: null, session: null });

      const { requireAuth } = await import('../require-auth');
      await expect(requireAuth()).rejects.toThrow('REDIRECT');

      expect(mockSignInPath).toHaveBeenCalledTimes(1);
      expect(mockSignInPath).toHaveBeenCalledWith();
    });

    it('should call verifyEmailPath function for redirect', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUnverifiedUser,
        session: { id: 'session-123' },
      });

      const { requireAuth } = await import('../require-auth');
      await expect(requireAuth()).rejects.toThrow('REDIRECT');

      expect(mockVerifyEmailPath).toHaveBeenCalledTimes(1);
      expect(mockVerifyEmailPath).toHaveBeenCalledWith();
    });
  });
});
