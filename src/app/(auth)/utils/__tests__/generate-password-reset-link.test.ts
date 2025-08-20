/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from 'vitest';

import { prisma } from '@/lib/prisma';
import { generateRandomToken } from '@/utils/generate-random-token';
import { getBaseUrl } from '@/utils/get-base-url';
import { hashToken } from '@/utils/hash-token';
import { resetPasswordPath } from '@/utils/paths';

import { generatePasswordResetLink } from '../generate-password-reset-link';

// Mock dependencies
vi.mock('@/lib/prisma');
vi.mock('@/utils/generate-random-token');
vi.mock('@/utils/get-base-url');
vi.mock('@/utils/hash-token');
vi.mock('@/utils/paths');

// Setup mocks
const mockPrismaCreate = vi.fn();

// Mock implementations
vi.mocked(prisma).passwordResetToken = {
  create: mockPrismaCreate,
} as any;

vi.mocked(generateRandomToken).mockReturnValue('mock-random-token');
vi.mocked(getBaseUrl).mockReturnValue('https://ticketfy.vercel.app');
vi.mocked(hashToken).mockReturnValue('mock-hashed-token');
vi.mocked(resetPasswordPath).mockReturnValue('/reset-password');

describe('generatePasswordResetLink', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(generateRandomToken).mockReturnValue('mock-random-token');
    vi.mocked(getBaseUrl).mockReturnValue('https://ticketfy.vercel.app');
    vi.mocked(hashToken).mockReturnValue('mock-hashed-token');
    vi.mocked(resetPasswordPath).mockReturnValue('/reset-password');
  });

  it('should generate a complete password reset link', async () => {
    const userId = 'user123';
    mockPrismaCreate.mockResolvedValue({
      id: 'token-id',
      tokenHash: 'mock-hashed-token',
      expiresAt: new Date(),
      userId: 'user123',
    });

    const result = await generatePasswordResetLink(userId);

    expect(result).toBe(
      'https://ticketfy.vercel.app/reset-password/mock-random-token',
    );
  });

  it('should create password reset token in database', async () => {
    const userId = 'user123';
    mockPrismaCreate.mockResolvedValue({
      id: 'token-id',
      tokenHash: 'mock-hashed-token',
      expiresAt: new Date(),
      userId: 'user123',
    });

    await generatePasswordResetLink(userId);

    expect(mockPrismaCreate).toHaveBeenCalledWith({
      data: {
        tokenHash: 'mock-hashed-token',
        expiresAt: expect.any(Date),
        userId: 'user123',
      },
    });
  });

  it('should set expiration time in the future', async () => {
    const userId = 'user123';
    mockPrismaCreate.mockResolvedValue({
      id: 'token-id',
      tokenHash: 'mock-hashed-token',
      expiresAt: new Date(),
      userId: 'user123',
    });

    const beforeTime = Date.now();
    await generatePasswordResetLink(userId);

    const createCall = mockPrismaCreate.mock.calls[0];
    const expiresAt = createCall[0].data.expiresAt.getTime();

    // Should expire in the future
    expect(expiresAt).toBeGreaterThan(beforeTime);
  });

  it('should handle different user IDs', async () => {
    const userIds = ['user1', 'user2', 'user3'];

    for (const userId of userIds) {
      mockPrismaCreate.mockResolvedValue({
        id: 'token-id',
        tokenHash: 'mock-hashed-token',
        expiresAt: new Date(),
        userId,
      });

      await generatePasswordResetLink(userId);

      const calls = mockPrismaCreate.mock.calls;
      const lastCall = calls[calls.length - 1];
      expect(lastCall[0].data.userId).toBe(userId);
    }
  });
});
