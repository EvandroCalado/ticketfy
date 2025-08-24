import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SESSION_MAX_DURATION_MS } from '@/constants/session-max-duration-ms';
import { SESSION_REFRESH_INTERVAL_MS } from '@/constants/session-refresh-interval-ms';
import { hashToken } from '@/utils/hash-token';

// Mock Prisma
const mockSessionCreate = vi.fn();
const mockSessionFindUnique = vi.fn();
const mockSessionUpdate = vi.fn();
const mockSessionDelete = vi.fn();

vi.mock('@/lib/prisma', () => ({
  prisma: {
    session: {
      create: mockSessionCreate,
      findUnique: mockSessionFindUnique,
      update: mockSessionUpdate,
      delete: mockSessionDelete,
    },
  },
}));

// Mock Date.now for consistent testing
const mockDateNow = vi.fn();
const OriginalDate = Date;
vi.stubGlobal(
  'Date',
  class extends OriginalDate {
    constructor(...args: unknown[]) {
      if (args.length === 0) {
        super();
      } else {
        super(...(args as ConstructorParameters<typeof OriginalDate>));
      }
    }

    static now = mockDateNow;
  },
);

describe('auth', () => {
  const mockUserId = 'user-123';
  const mockSessionToken = 'session-token-123';
  const mockSessionId = hashToken(mockSessionToken);
  const mockUser = {
    id: mockUserId,
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
    passwordHash: 'hashed-password',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockDateNow.mockReturnValue(1000000000000); // Fixed timestamp
  });

  describe('createSession', () => {
    it('should create a new session successfully', async () => {
      const { createSession } = await import('../auth');

      const expectedSession = {
        id: mockSessionId,
        userId: mockUserId,
        expiresAt: new Date(1000000000000 + SESSION_MAX_DURATION_MS),
      };

      mockSessionCreate.mockResolvedValue(expectedSession);

      const result = await createSession(mockSessionToken, mockUserId);

      expect(mockSessionCreate).toHaveBeenCalledWith({
        data: expectedSession,
      });
      expect(result).toEqual(expectedSession);
    });

    it('should hash the session token correctly', async () => {
      const { createSession } = await import('../auth');

      const expectedSession = {
        id: mockSessionId,
        userId: mockUserId,
        expiresAt: new Date(1000000000000 + SESSION_MAX_DURATION_MS),
      };

      mockSessionCreate.mockResolvedValue(expectedSession);

      await createSession(mockSessionToken, mockUserId);

      expect(mockSessionCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          id: hashToken(mockSessionToken),
        }),
      });
    });

    it('should set correct expiration time', async () => {
      const { createSession } = await import('../auth');

      const currentTime = 1500000000000;
      mockDateNow.mockReturnValue(currentTime);

      const expectedExpiresAt = new Date(currentTime + SESSION_MAX_DURATION_MS);

      mockSessionCreate.mockResolvedValue({
        id: mockSessionId,
        userId: mockUserId,
        expiresAt: expectedExpiresAt,
      });

      await createSession(mockSessionToken, mockUserId);

      expect(mockSessionCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          expiresAt: expectedExpiresAt,
        }),
      });
    });
  });

  describe('validateSession', () => {
    it('should return null when session does not exist', async () => {
      const { validateSession } = await import('../auth');

      mockSessionFindUnique.mockResolvedValue(null);

      const result = await validateSession(mockSessionToken);

      expect(mockSessionFindUnique).toHaveBeenCalledWith({
        where: { id: mockSessionId },
        include: { user: true },
      });
      expect(result).toEqual({ session: null, user: null });
    });

    it('should delete and return null when session is expired', async () => {
      const { validateSession } = await import('../auth');

      const expiredSession = {
        id: mockSessionId,
        userId: mockUserId,
        expiresAt: new Date(999999999999), // Before current time
        createdAt: new Date(),
        updatedAt: new Date(),
        user: mockUser,
      };

      mockSessionFindUnique.mockResolvedValue(expiredSession);
      mockSessionDelete.mockResolvedValue(expiredSession);

      const result = await validateSession(mockSessionToken);

      expect(mockSessionDelete).toHaveBeenCalledWith({
        where: { id: mockSessionId },
      });
      expect(result).toEqual({ session: null, user: null });
    });

    it('should return session and user when session is valid and does not need refresh', async () => {
      const { validateSession } = await import('../auth');

      const validSession = {
        id: mockSessionId,
        userId: mockUserId,
        expiresAt: new Date(1000000000000 + SESSION_MAX_DURATION_MS), // Far in the future
        createdAt: new Date(),
        updatedAt: new Date(),
        user: mockUser,
      };

      mockSessionFindUnique.mockResolvedValue(validSession);

      const result = await validateSession(mockSessionToken);

      expect(mockSessionUpdate).not.toHaveBeenCalled();
      expect(result).toEqual({
        session: {
          id: mockSessionId,
          userId: mockUserId,
          expiresAt: validSession.expiresAt,
          createdAt: validSession.createdAt,
          updatedAt: validSession.updatedAt,
        },
        user: mockUser,
      });
    });

    it('should refresh session when it needs refresh', async () => {
      const { validateSession } = await import('../auth');

      // Session that expires within refresh interval
      const sessionNeedingRefresh = {
        id: mockSessionId,
        userId: mockUserId,
        expiresAt: new Date(1000000000000 + SESSION_REFRESH_INTERVAL_MS - 1000), // Within refresh window
        createdAt: new Date(),
        updatedAt: new Date(),
        user: mockUser,
      };

      const updatedSession = {
        ...sessionNeedingRefresh,
        expiresAt: new Date(1000000000000 + SESSION_MAX_DURATION_MS),
      };

      mockSessionFindUnique.mockResolvedValue(sessionNeedingRefresh);
      mockSessionUpdate.mockResolvedValue(updatedSession);

      const result = await validateSession(mockSessionToken);

      expect(mockSessionUpdate).toHaveBeenCalledWith({
        where: { id: mockSessionId },
        data: {
          expiresAt: new Date(1000000000000 + SESSION_MAX_DURATION_MS),
        },
      });

      expect(result.session?.expiresAt).toEqual(
        new Date(1000000000000 + SESSION_MAX_DURATION_MS),
      );
      expect(result.user).toEqual(mockUser);
    });

    it('should handle session at exact refresh boundary', async () => {
      const { validateSession } = await import('../auth');

      // Session that expires exactly at refresh interval
      const sessionAtBoundary = {
        id: mockSessionId,
        userId: mockUserId,
        expiresAt: new Date(1000000000000 + SESSION_REFRESH_INTERVAL_MS),
        createdAt: new Date(),
        updatedAt: new Date(),
        user: mockUser,
      };

      mockSessionFindUnique.mockResolvedValue(sessionAtBoundary);
      mockSessionUpdate.mockResolvedValue({
        ...sessionAtBoundary,
        expiresAt: new Date(1000000000000 + SESSION_MAX_DURATION_MS),
      });

      await validateSession(mockSessionToken);

      expect(mockSessionUpdate).toHaveBeenCalled();
    });

    it('should handle session at exact expiration boundary', async () => {
      const { validateSession } = await import('../auth');

      // Session that expires exactly at current time
      const sessionAtExpiration = {
        id: mockSessionId,
        userId: mockUserId,
        expiresAt: new Date(1000000000000),
        createdAt: new Date(),
        updatedAt: new Date(),
        user: mockUser,
      };

      mockSessionFindUnique.mockResolvedValue(sessionAtExpiration);
      mockSessionDelete.mockResolvedValue(sessionAtExpiration);

      const result = await validateSession(mockSessionToken);

      expect(mockSessionDelete).toHaveBeenCalledWith({
        where: { id: mockSessionId },
      });
      expect(result).toEqual({ session: null, user: null });
    });
  });

  describe('invalidateSession', () => {
    it('should delete session by id', async () => {
      const { invalidateSession } = await import('../auth');

      mockSessionDelete.mockResolvedValue({
        id: mockSessionId,
        userId: mockUserId,
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await invalidateSession(mockSessionId);

      expect(mockSessionDelete).toHaveBeenCalledWith({
        where: { id: mockSessionId },
      });
    });

    it('should handle deletion of non-existent session', async () => {
      const { invalidateSession } = await import('../auth');

      mockSessionDelete.mockRejectedValue(new Error('Session not found'));

      await expect(invalidateSession('non-existent-id')).rejects.toThrow(
        'Session not found',
      );
    });
  });

  describe('edge cases', () => {
    it('should handle database errors in createSession', async () => {
      const { createSession } = await import('../auth');

      mockSessionCreate.mockRejectedValue(new Error('Database error'));

      await expect(createSession(mockSessionToken, mockUserId)).rejects.toThrow(
        'Database error',
      );
    });

    it('should handle database errors in validateSession findUnique', async () => {
      const { validateSession } = await import('../auth');

      mockSessionFindUnique.mockRejectedValue(new Error('Database error'));

      await expect(validateSession(mockSessionToken)).rejects.toThrow(
        'Database error',
      );
    });

    it('should handle database errors in validateSession update', async () => {
      const { validateSession } = await import('../auth');

      const sessionNeedingRefresh = {
        id: mockSessionId,
        userId: mockUserId,
        expiresAt: new Date(1000000000000 + SESSION_REFRESH_INTERVAL_MS - 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
        user: mockUser,
      };

      mockSessionFindUnique.mockResolvedValue(sessionNeedingRefresh);
      mockSessionUpdate.mockRejectedValue(new Error('Update failed'));

      await expect(validateSession(mockSessionToken)).rejects.toThrow(
        'Update failed',
      );
    });

    it('should handle database errors in validateSession delete', async () => {
      const { validateSession } = await import('../auth');

      const expiredSession = {
        id: mockSessionId,
        userId: mockUserId,
        expiresAt: new Date(999999999999),
        createdAt: new Date(),
        updatedAt: new Date(),
        user: mockUser,
      };

      mockSessionFindUnique.mockResolvedValue(expiredSession);
      mockSessionDelete.mockRejectedValue(new Error('Delete failed'));

      await expect(validateSession(mockSessionToken)).rejects.toThrow(
        'Delete failed',
      );
    });
  });
});
