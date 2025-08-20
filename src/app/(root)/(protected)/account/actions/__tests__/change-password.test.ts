import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock all dependencies
vi.mock('@/actions/get-auth', () => ({
  getAuth: vi.fn(),
}));

vi.mock('@/app/(auth)/utils/verify-password', () => ({
  verifyPassword: vi.fn(),
}));

vi.mock('@/lib/inngest', () => ({
  inngest: {
    send: vi.fn().mockResolvedValue(undefined),
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

describe('changePassword', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should change password successfully with valid current password', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { verifyPassword } = await import(
      '@/app/(auth)/utils/verify-password'
    );
    const { inngest } = await import('@/lib/inngest');

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: true,
      passwordHash: 'hashed-current-password',
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

    vi.mocked(verifyPassword).mockResolvedValue(true);

    const formData = new FormData();
    formData.append('password', 'current-password');

    const { changePassword } = await import('../change-password');
    const result = await changePassword(undefined, formData);

    expect(result).toEqual({
      success: true,
      message: 'Verifique seu email para redefinir sua senha',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(verifyPassword).toHaveBeenCalledWith(
      'hashed-current-password',
      'current-password',
    );

    expect(inngest.send).toHaveBeenCalledWith({
      name: 'app/(auth)/reset-password/[tokenId].reset-password',
      data: { userId: 'user-id' },
    });
  });

  it('should return error when user is not authenticated', async () => {
    const { getAuth } = await import('@/actions/get-auth');

    vi.mocked(getAuth).mockResolvedValue({
      user: null,
      session: null,
    });

    const formData = new FormData();
    formData.append('password', 'some-password');

    const { changePassword } = await import('../change-password');
    const result = await changePassword(undefined, formData);

    expect(result).toEqual({
      success: false,
      message: 'Credenciais inválidas',
      fieldErrors: undefined,
      payload: undefined,
    });
  });

  it('should return error when current password is incorrect', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { verifyPassword } = await import(
      '@/app/(auth)/utils/verify-password'
    );

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: true,
      passwordHash: 'hashed-current-password',
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

    vi.mocked(verifyPassword).mockResolvedValue(false);

    const formData = new FormData();
    formData.append('password', 'wrong-password');

    const { changePassword } = await import('../change-password');
    const result = await changePassword(undefined, formData);

    expect(result).toEqual({
      success: false,
      message: 'Senha atual incorreta',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(verifyPassword).toHaveBeenCalledWith(
      'hashed-current-password',
      'wrong-password',
    );
  });

  it('should handle validation errors for invalid password format', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: true,
      passwordHash: 'hashed-current-password',
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
    formData.append('password', '123'); // Too short password

    const { changePassword } = await import('../change-password');
    const result = await changePassword(undefined, formData);

    expect(formErrorHandler).toHaveBeenCalled();
    expect(result.success).toBe(false);
  });

  it('should handle password verification errors', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { verifyPassword } = await import(
      '@/app/(auth)/utils/verify-password'
    );
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: true,
      passwordHash: 'hashed-current-password',
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

    const testError = new Error('Password verification failed');
    vi.mocked(verifyPassword).mockRejectedValue(testError);

    const formData = new FormData();
    formData.append('password', 'valid-password');

    const { changePassword } = await import('../change-password');
    const result = await changePassword(undefined, formData);

    expect(formErrorHandler).toHaveBeenCalledWith(testError, formData);
    expect(result.success).toBe(false);
  });

  it('should handle inngest send errors', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { verifyPassword } = await import(
      '@/app/(auth)/utils/verify-password'
    );
    const { inngest } = await import('@/lib/inngest');
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: true,
      passwordHash: 'hashed-current-password',
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

    vi.mocked(verifyPassword).mockResolvedValue(true);

    const testError = new Error('Inngest send failed');
    vi.mocked(inngest.send).mockRejectedValue(testError);

    const formData = new FormData();
    formData.append('password', 'valid-password');

    const { changePassword } = await import('../change-password');
    const result = await changePassword(undefined, formData);

    expect(formErrorHandler).toHaveBeenCalledWith(testError, formData);
    expect(result.success).toBe(false);
  });

  it('should verify password with correct hash and password', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { verifyPassword } = await import(
      '@/app/(auth)/utils/verify-password'
    );

    const mockUser = {
      id: 'test-user-id',
      name: 'testuser',
      email: 'test@example.com',
      emailVerified: true,
      passwordHash: 'test-hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: {
        id: 'session-id',
        userId: 'test-user-id',
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    vi.mocked(verifyPassword).mockResolvedValue(true);

    const formData = new FormData();
    formData.append('password', 'test-password');

    const { changePassword } = await import('../change-password');
    await changePassword(undefined, formData);

    expect(verifyPassword).toHaveBeenCalledWith(
      'test-hashed-password',
      'test-password',
    );
  });

  it('should send correct event data to inngest', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { verifyPassword } = await import(
      '@/app/(auth)/utils/verify-password'
    );
    const { inngest } = await import('@/lib/inngest');

    const mockUser = {
      id: 'specific-user-id',
      name: 'specificuser',
      email: 'specific@example.com',
      emailVerified: true,
      passwordHash: 'specific-hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: {
        id: 'session-id',
        userId: 'specific-user-id',
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    vi.mocked(verifyPassword).mockResolvedValue(true);

    const formData = new FormData();
    formData.append('password', 'valid-password');

    const { changePassword } = await import('../change-password');
    await changePassword(undefined, formData);

    expect(inngest.send).toHaveBeenCalledWith({
      name: 'app/(auth)/reset-password/[tokenId].reset-password',
      data: { userId: 'specific-user-id' },
    });
  });
});
