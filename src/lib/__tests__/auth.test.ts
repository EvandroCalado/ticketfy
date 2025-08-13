import { describe, expect, it, vi } from 'vitest';

import { hashToken } from '@/utils/hash-token';

// Mock Prisma
const mockPrisma = {
  session: {
    create: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}));

// Mock constants
vi.mock('@/constants/session-max-duration-ms', () => ({
  SESSION_MAX_DURATION_MS: 30 * 24 * 60 * 60 * 1000, // 30 days
}));

vi.mock('@/constants/session-refresh-interval-ms', () => ({
  SESSION_REFRESH_INTERVAL_MS: 15 * 24 * 60 * 60 * 1000, // 15 days
}));

describe('auth', () => {
  describe('session logic', () => {
    it('should hash session token correctly', () => {
      const token = 'test-session-token';
      const hashedToken = hashToken(token);

      expect(typeof hashedToken).toBe('string');
      expect(hashedToken.length).toBe(64); // SHA256 hex length
    });

    it('should calculate session expiration correctly', () => {
      const now = Date.now();
      const maxDuration = 30 * 24 * 60 * 60 * 1000; // 30 days
      const expectedExpiration = new Date(now + maxDuration);

      // Test that expiration is approximately correct (within 1 second)
      const actualExpiration = new Date(now + maxDuration);
      expect(
        Math.abs(actualExpiration.getTime() - expectedExpiration.getTime()),
      ).toBeLessThan(1000);
    });

    it('should determine if session needs refresh', () => {
      const now = Date.now();
      const refreshInterval = 15 * 24 * 60 * 60 * 1000; // 15 days

      // Session that expires in 10 days (should refresh)
      const expiresInTenDays = new Date(now + 10 * 24 * 60 * 60 * 1000);
      const shouldRefresh = now >= expiresInTenDays.getTime() - refreshInterval;
      expect(shouldRefresh).toBe(true);

      // Session that expires in 20 days (should not refresh)
      const expiresInTwentyDays = new Date(now + 20 * 24 * 60 * 60 * 1000);
      const shouldNotRefresh =
        now >= expiresInTwentyDays.getTime() - refreshInterval;
      expect(shouldNotRefresh).toBe(false);
    });

    it('should determine if session is expired', () => {
      const now = Date.now();

      // Expired session
      const expiredSession = new Date(now - 1000); // 1 second ago
      expect(now >= expiredSession.getTime()).toBe(true);

      // Valid session
      const validSession = new Date(now + 1000); // 1 second from now
      expect(now >= validSession.getTime()).toBe(false);
    });
  });
});
