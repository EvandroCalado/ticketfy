import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock all dependencies
vi.mock('@/actions/get-auth', () => ({
  getAuth: vi.fn(),
}));

vi.mock('@/actions/set-session-cookie', () => ({
  setSessionCookie: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/lib/auth', () => ({
  createSession: vi.fn().mockResolvedValue({
    id: 'session-id',
    userId: 'user-id',
    expiresAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    emailVerificationToken: {
      findFirst: vi.fn(),
      delete: vi.fn(),
    },
    session: {
      deleteMany: vi.fn(),
    },
    user: {
      update: vi.fn(),
    },
  },
}));

vi.mock('@/utils/form-error-handler', () => ({
  formErrorHandler: vi.fn().mockReturnValue({
    success: false,
    message: 'Erro no formulário',
    fieldErrors: undefined,
    payload: undefined,
  }),
}));

vi.mock('@/utils/generate-random-token', () => ({
  generateRandomToken: vi.fn().mockReturnValue('random-token'),
}));

describe('verifyEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should verify email successfully with valid code', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');
    const { createSession } = await import('@/lib/auth');
    const { setSessionCookie } = await import('@/actions/set-session-cookie');
    const { generateRandomToken } = await import(
      '@/utils/generate-random-token'
    );

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: false,
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockToken = {
      id: 'token-id',
      code: '12345678',
      userId: 'user-id',
      email: 'john@example.com',
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockSession = {
      id: 'session-id',
      userId: 'user-id',
      expiresAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: {
        id: 'old-session-id',
        userId: 'user-id',
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    vi.mocked(prisma.emailVerificationToken.findFirst).mockResolvedValue(
      mockToken,
    );
    vi.mocked(prisma.emailVerificationToken.delete).mockResolvedValue(
      mockToken,
    );
    vi.mocked(prisma.session.deleteMany).mockResolvedValue({ count: 1 });
    vi.mocked(prisma.user.update).mockResolvedValue({
      ...mockUser,
      emailVerified: true,
    });
    vi.mocked(createSession).mockResolvedValue(mockSession);

    const formData = new FormData();
    formData.append('code', '12345678');

    const { verifyEmail } = await import('../verify-email');
    const result = await verifyEmail(undefined, formData);

    expect(result).toEqual({
      success: true,
      message: 'Email verificado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(prisma.emailVerificationToken.findFirst).toHaveBeenCalledWith({
      where: { userId: 'user-id', email: 'john@example.com', code: '12345678' },
    });

    expect(prisma.emailVerificationToken.delete).toHaveBeenCalledWith({
      where: { id: 'token-id' },
    });

    expect(prisma.session.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'user-id' },
    });

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-id' },
      data: { emailVerified: true },
    });

    expect(generateRandomToken).toHaveBeenCalled();
    expect(createSession).toHaveBeenCalledWith('random-token', 'user-id');
    expect(setSessionCookie).toHaveBeenCalledWith(
      'random-token',
      mockSession.expiresAt,
    );
  });

  it('should return error when user is not authenticated', async () => {
    const { getAuth } = await import('@/actions/get-auth');

    vi.mocked(getAuth).mockResolvedValue({
      user: null,
      session: null,
    });

    const formData = new FormData();
    formData.append('code', '12345678');

    const { verifyEmail } = await import('../verify-email');
    const result = await verifyEmail(undefined, formData);

    expect(result).toEqual({
      success: false,
      message: 'Usuário não autenticado',
      fieldErrors: undefined,
      payload: undefined,
    });
  });

  it('should return error when verification code is invalid', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: false,
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: {
        id: 'session-id',
        userId: 'user-id',
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    vi.mocked(prisma.emailVerificationToken.findFirst).mockResolvedValue(null);

    const formData = new FormData();
    formData.append('code', '87654321');

    const { verifyEmail } = await import('../verify-email');
    const result = await verifyEmail(undefined, formData);

    expect(result).toEqual({
      success: false,
      message: 'Código de verificação inválido',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(prisma.emailVerificationToken.findFirst).toHaveBeenCalledWith({
      where: { userId: 'user-id', email: 'john@example.com', code: '87654321' },
    });
  });

  it('should return error when verification code is expired', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: false,
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const expiredToken = {
      id: 'token-id',
      code: '12345678',
      userId: 'user-id',
      email: 'john@example.com',
      expiresAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: {
        id: 'session-id',
        userId: 'user-id',
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    vi.mocked(prisma.emailVerificationToken.findFirst).mockResolvedValue(
      expiredToken,
    );

    const formData = new FormData();
    formData.append('code', '12345678');

    const { verifyEmail } = await import('../verify-email');
    const result = await verifyEmail(undefined, formData);

    expect(result).toEqual({
      success: false,
      message: 'Código de verificação expirado',
      fieldErrors: undefined,
      payload: undefined,
    });
  });

  it('should handle validation errors for invalid code format', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: false,
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: {
        id: 'session-id',
        userId: 'user-id',
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const formData = new FormData();
    formData.append('code', '123'); // Invalid code length

    const { verifyEmail } = await import('../verify-email');
    const result = await verifyEmail(undefined, formData);

    expect(formErrorHandler).toHaveBeenCalled();
    expect(result.success).toBe(false);
  });

  it('should handle database errors', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: false,
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: {
        id: 'session-id',
        userId: 'user-id',
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const testError = new Error('Database error');
    vi.mocked(prisma.emailVerificationToken.findFirst).mockRejectedValue(
      testError,
    );

    const formData = new FormData();
    formData.append('code', '12345678');

    const { verifyEmail } = await import('../verify-email');
    const result = await verifyEmail(undefined, formData);

    expect(formErrorHandler).toHaveBeenCalledWith(testError, formData);
    expect(result.success).toBe(false);
  });

  it('should delete old sessions and create new session after verification', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');
    const { createSession } = await import('@/lib/auth');

    const mockUser = {
      id: 'test-user-id',
      name: 'testuser',
      email: 'test@example.com',
      emailVerified: false,
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockToken = {
      id: 'token-id',
      code: '87654321',
      userId: 'test-user-id',
      email: 'test@example.com',
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: {
        id: 'old-session-id',
        userId: 'test-user-id',
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    vi.mocked(prisma.emailVerificationToken.findFirst).mockResolvedValue(
      mockToken,
    );
    vi.mocked(prisma.emailVerificationToken.delete).mockResolvedValue(
      mockToken,
    );
    vi.mocked(prisma.session.deleteMany).mockResolvedValue({ count: 2 });
    vi.mocked(prisma.user.update).mockResolvedValue({
      ...mockUser,
      emailVerified: true,
    });

    const formData = new FormData();
    formData.append('code', '87654321');

    const { verifyEmail } = await import('../verify-email');
    await verifyEmail(undefined, formData);

    expect(prisma.session.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'test-user-id' },
    });

    expect(createSession).toHaveBeenCalledWith('random-token', 'test-user-id');
  });

  it('should update user emailVerified status to true', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: false,
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockToken = {
      id: 'token-id',
      code: '11111111',
      userId: 'user-id',
      email: 'john@example.com',
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: {
        id: 'session-id',
        userId: 'user-id',
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    vi.mocked(prisma.emailVerificationToken.findFirst).mockResolvedValue(
      mockToken,
    );
    vi.mocked(prisma.emailVerificationToken.delete).mockResolvedValue(
      mockToken,
    );
    vi.mocked(prisma.session.deleteMany).mockResolvedValue({ count: 1 });
    vi.mocked(prisma.user.update).mockResolvedValue({
      ...mockUser,
      emailVerified: true,
    });

    const formData = new FormData();
    formData.append('code', '11111111');

    const { verifyEmail } = await import('../verify-email');
    await verifyEmail(undefined, formData);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-id' },
      data: { emailVerified: true },
    });
  });
});
