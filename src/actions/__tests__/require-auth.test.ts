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

// Mock getOrganizationByUser
const mockGetOrganizationByUser = vi.fn();
vi.mock(
  '@/app/(root)/(protected)/organizations/actions/get-organization-by-user',
  () => ({
    getOrganizationByUser: mockGetOrganizationByUser,
  }),
);

// Mock paths
const mockSignInPath = vi.fn(() => '/sign-in');
const mockVerifyEmailPath = vi.fn(() => '/verify-email');
const mockOnboardingPath = vi.fn(() => '/onboarding');
const mockSelectActiveOrganizationPath = vi.fn(
  () => '/onboarding/select-active-organization',
);
vi.mock('@/utils/paths', () => ({
  signInPath: mockSignInPath,
  verifyEmailPath: mockVerifyEmailPath,
  onboardingPath: mockOnboardingPath,
  selectActiveOrganizationPath: mockSelectActiveOrganizationPath,
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

  const mockOrganizations = [
    {
      id: 'org-123',
      name: 'Test Organization',
      membershipByUser: {
        id: 'membership-123',
        userId: 'user-123',
        organizationId: 'org-123',
        isActive: true,
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ];

  const mockOrganizationsWithoutActive = [
    {
      id: 'org-123',
      name: 'Test Organization',
      membershipByUser: {
        id: 'membership-123',
        userId: 'user-123',
        organizationId: 'org-123',
        isActive: false,
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ];

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

    it('should return user when authenticated, email verified, and has active organization', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUser,
        session: { id: 'session-123' },
      });
      mockGetOrganizationByUser.mockResolvedValue(mockOrganizations);

      const { requireAuth } = await import('../require-auth');
      const result = await requireAuth();

      expect(mockRedirect).not.toHaveBeenCalled();
      expect(result).toEqual({ user: mockUser });
    });

    it('should redirect to onboarding when user has no organizations', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUser,
        session: { id: 'session-123' },
      });
      mockGetOrganizationByUser.mockResolvedValue([]);

      const { requireAuth } = await import('../require-auth');

      await expect(requireAuth()).rejects.toThrow('REDIRECT');
      expect(mockRedirect).toHaveBeenCalledWith('/onboarding');
      expect(mockOnboardingPath).toHaveBeenCalled();
    });

    it('should redirect to select-active-organization when user has no active organization', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUser,
        session: { id: 'session-123' },
      });
      mockGetOrganizationByUser.mockResolvedValue(
        mockOrganizationsWithoutActive,
      );

      const { requireAuth } = await import('../require-auth');

      await expect(requireAuth()).rejects.toThrow('REDIRECT');
      expect(mockRedirect).toHaveBeenCalledWith(
        '/onboarding/select-active-organization',
      );
      expect(mockSelectActiveOrganizationPath).toHaveBeenCalled();
    });

    it('should skip email verification when checkEmailVerified is false', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUnverifiedUser,
        session: { id: 'session-123' },
      });
      mockGetOrganizationByUser.mockResolvedValue(mockOrganizations);

      const { requireAuth } = await import('../require-auth');
      const result = await requireAuth({ checkEmailVerified: false });

      expect(mockRedirect).not.toHaveBeenCalled();
      expect(result).toEqual({ user: mockUnverifiedUser });
    });

    it('should skip organization check when both checkOrganization and checkActiveOrganization are false', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUser,
        session: { id: 'session-123' },
      });

      const { requireAuth } = await import('../require-auth');
      const result = await requireAuth({
        checkOrganization: false,
        checkActiveOrganization: false,
      });

      expect(mockRedirect).not.toHaveBeenCalled();
      expect(mockGetOrganizationByUser).not.toHaveBeenCalled();
      expect(result).toEqual({ user: mockUser });
    });

    it('should skip active organization check when checkActiveOrganization is false', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUser,
        session: { id: 'session-123' },
      });
      mockGetOrganizationByUser.mockResolvedValue(
        mockOrganizationsWithoutActive,
      );

      const { requireAuth } = await import('../require-auth');
      const result = await requireAuth({ checkActiveOrganization: false });

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

    it('should handle getOrganizationByUser errors', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUser,
        session: { id: 'session-123' },
      });
      mockGetOrganizationByUser.mockRejectedValue(
        new Error('Organization error'),
      );

      const { requireAuth } = await import('../require-auth');

      await expect(requireAuth()).rejects.toThrow('Organization error');
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

    it('should call onboardingPath function for redirect', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUser,
        session: { id: 'session-123' },
      });
      mockGetOrganizationByUser.mockResolvedValue([]);

      const { requireAuth } = await import('../require-auth');
      await expect(requireAuth()).rejects.toThrow('REDIRECT');

      expect(mockOnboardingPath).toHaveBeenCalledTimes(1);
      expect(mockOnboardingPath).toHaveBeenCalledWith();
    });

    it('should call selectActiveOrganizationPath function for redirect', async () => {
      mockGetAuth.mockResolvedValue({
        user: mockUser,
        session: { id: 'session-123' },
      });
      mockGetOrganizationByUser.mockResolvedValue(
        mockOrganizationsWithoutActive,
      );

      const { requireAuth } = await import('../require-auth');
      await expect(requireAuth()).rejects.toThrow('REDIRECT');

      expect(mockSelectActiveOrganizationPath).toHaveBeenCalledTimes(1);
      expect(mockSelectActiveOrganizationPath).toHaveBeenCalledWith();
    });
  });
});
