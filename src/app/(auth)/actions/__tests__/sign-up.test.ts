import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock all dependencies
vi.mock('@node-rs/argon2', () => ({
  hash: vi.fn().mockResolvedValue('hashed-password'),
}));

vi.mock('@/actions/set-session-cookie', () => ({
  setSessionCookie: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/lib/auth', () => ({
  createSession: vi.fn().mockResolvedValue({
    id: 'session-id',
    expiresAt: new Date(),
  }),
}));

vi.mock('@/lib/inngest', () => ({
  inngest: {
    send: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      create: vi.fn(),
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

describe('signUp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create user successfully with valid data', async () => {
    const { prisma } = await import('@/lib/prisma');
    const { inngest } = await import('@/lib/inngest');
    const { setSessionCookie } = await import('@/actions/set-session-cookie');
    const { createSession } = await import('@/lib/auth');

    // Mock successful user creation
    vi.mocked(prisma.user.create).mockResolvedValue({
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: false,
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const formData = new FormData();
    formData.append('name', 'johndoe');
    formData.append('email', 'john@example.com');
    formData.append('password', 'password123');
    formData.append('confirmPassword', 'password123');

    const { signUp } = await import('../sign-up');
    const result = await signUp(undefined, formData);

    expect(result).toEqual({
      success: true,
      message: 'Usuário criado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'johndoe',
        email: 'john@example.com',
        passwordHash: 'hashed-password',
      },
    });

    expect(inngest.send).toHaveBeenCalledWith({
      name: 'app/auth.sign-up',
      data: { userId: 'user-id' },
    });

    expect(createSession).toHaveBeenCalledWith('random-token', 'user-id');
    expect(setSessionCookie).toHaveBeenCalled();
  });

  it('should return error when email already exists', async () => {
    const { prisma } = await import('@/lib/prisma');

    // Mock Prisma unique constraint error
    vi.mocked(prisma.user.create).mockRejectedValue({
      code: 'P2002',
      message: 'Unique constraint failed',
    });

    const formData = new FormData();
    formData.append('name', 'johndoe');
    formData.append('email', 'existing@example.com');
    formData.append('password', 'password123');
    formData.append('confirmPassword', 'password123');

    const { signUp } = await import('../sign-up');
    const result = await signUp(undefined, formData);

    expect(result).toEqual({
      success: false,
      message: 'Email já cadastrado',
      fieldErrors: undefined,
      payload: undefined,
    });
  });

  it('should handle validation errors', async () => {
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    const formData = new FormData();
    formData.append('name', 'jo'); // Too short
    formData.append('email', 'invalid-email');
    formData.append('password', '123'); // Too short
    formData.append('confirmPassword', 'different');

    const { signUp } = await import('../sign-up');
    const result = await signUp(undefined, formData);

    expect(formErrorHandler).toHaveBeenCalled();
    expect(result.success).toBe(false);
  });

  it('should handle name with spaces validation error', async () => {
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    const formData = new FormData();
    formData.append('name', 'john doe'); // Contains spaces
    formData.append('email', 'john@example.com');
    formData.append('password', 'password123');
    formData.append('confirmPassword', 'password123');

    const { signUp } = await import('../sign-up');
    const result = await signUp(undefined, formData);

    expect(formErrorHandler).toHaveBeenCalled();
    expect(result.success).toBe(false);
  });

  it('should handle password mismatch validation error', async () => {
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    const formData = new FormData();
    formData.append('name', 'johndoe');
    formData.append('email', 'john@example.com');
    formData.append('password', 'password123');
    formData.append('confirmPassword', 'different123');

    const { signUp } = await import('../sign-up');
    const result = await signUp(undefined, formData);

    expect(formErrorHandler).toHaveBeenCalled();
    expect(result.success).toBe(false);
  });

  it('should handle database errors', async () => {
    const { prisma } = await import('@/lib/prisma');
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    // Mock database error
    vi.mocked(prisma.user.create).mockRejectedValue(
      new Error('Database error'),
    );

    const formData = new FormData();
    formData.append('name', 'johndoe');
    formData.append('email', 'john@example.com');
    formData.append('password', 'password123');
    formData.append('confirmPassword', 'password123');

    const { signUp } = await import('../sign-up');
    const result = await signUp(undefined, formData);

    expect(formErrorHandler).toHaveBeenCalledWith(expect.any(Error), formData);
    expect(result.success).toBe(false);
  });

  it('should hash password before storing', async () => {
    const { hash } = await import('@node-rs/argon2');
    const { prisma } = await import('@/lib/prisma');

    vi.mocked(prisma.user.create).mockResolvedValue({
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: false,
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const formData = new FormData();
    formData.append('name', 'johndoe');
    formData.append('email', 'john@example.com');
    formData.append('password', 'plaintext-password');
    formData.append('confirmPassword', 'plaintext-password');

    const { signUp } = await import('../sign-up');
    await signUp(undefined, formData);

    expect(hash).toHaveBeenCalledWith('plaintext-password');
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'johndoe',
        email: 'john@example.com',
        passwordHash: 'hashed-password',
      },
    });
  });

  it('should send email verification event after user creation', async () => {
    const { prisma } = await import('@/lib/prisma');
    const { inngest } = await import('@/lib/inngest');

    const mockUser = {
      id: 'test-user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: false,
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(prisma.user.create).mockResolvedValue(mockUser);

    const formData = new FormData();
    formData.append('name', 'johndoe');
    formData.append('email', 'john@example.com');
    formData.append('password', 'password123');
    formData.append('confirmPassword', 'password123');

    const { signUp } = await import('../sign-up');
    await signUp(undefined, formData);

    expect(inngest.send).toHaveBeenCalledWith({
      name: 'app/auth.sign-up',
      data: { userId: 'test-user-id' },
    });
  });

  it('should create session and set cookie after successful signup', async () => {
    const { prisma } = await import('@/lib/prisma');
    const { createSession } = await import('@/lib/auth');
    const { setSessionCookie } = await import('@/actions/set-session-cookie');
    const { generateRandomToken } = await import(
      '@/utils/generate-random-token'
    );

    const mockUser = {
      id: 'test-user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: false,
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockSession = {
      id: 'session-id',
      userId: 'test-user-id',
      expiresAt: new Date('2024-12-31'),
    };

    vi.mocked(prisma.user.create).mockResolvedValue(mockUser);
    vi.mocked(createSession).mockResolvedValue(mockSession);

    const formData = new FormData();
    formData.append('name', 'johndoe');
    formData.append('email', 'john@example.com');
    formData.append('password', 'password123');
    formData.append('confirmPassword', 'password123');

    const { signUp } = await import('../sign-up');
    await signUp(undefined, formData);

    expect(generateRandomToken).toHaveBeenCalled();
    expect(createSession).toHaveBeenCalledWith('random-token', 'test-user-id');
    expect(setSessionCookie).toHaveBeenCalledWith(
      'random-token',
      mockSession.expiresAt,
    );
  });
});
