import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock all dependencies
vi.mock('@/actions/get-auth', () => ({
  getAuth: vi.fn(),
}));

vi.mock('@/app/(auth)/utils/generate-email-verification-code', () => ({
  generateEmailVerificationCode: vi.fn().mockResolvedValue('123456'),
}));

vi.mock('@/app/(auth)/utils/send-email-verify', () => ({
  sendEmailVerify: vi.fn(),
}));

vi.mock('@/utils/form-error-handler', () => ({
  formErrorHandler: vi.fn().mockReturnValue({
    success: false,
    message: 'Erro no formulário',
    fieldErrors: undefined,
    payload: undefined,
  }),
}));

describe('verifyEmailResendAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should resend email verification successfully when user is authenticated', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { generateEmailVerificationCode } = await import(
      '@/app/(auth)/utils/generate-email-verification-code'
    );
    const { sendEmailVerify } = await import(
      '@/app/(auth)/utils/send-email-verify'
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

    vi.mocked(sendEmailVerify).mockResolvedValue({
      data: { id: 'email-id' },
      error: null,
    });

    const { verifyEmailResendAction } = await import('../verify-email-resend');
    const result = await verifyEmailResendAction();

    expect(result).toEqual({
      success: true,
      message: 'Código reenviado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(generateEmailVerificationCode).toHaveBeenCalledWith(
      'user-id',
      'john@example.com',
    );

    expect(sendEmailVerify).toHaveBeenCalledWith(
      'johndoe',
      'john@example.com',
      '123456',
    );
  });

  it('should return error when user is not authenticated', async () => {
    const { getAuth } = await import('@/actions/get-auth');

    vi.mocked(getAuth).mockResolvedValue({
      user: null,
      session: null,
    });

    const { verifyEmailResendAction } = await import('../verify-email-resend');
    const result = await verifyEmailResendAction();

    expect(result).toEqual({
      success: false,
      message: 'Usuário não autenticado',
      fieldErrors: undefined,
      payload: undefined,
    });
  });

  it('should return error when email sending fails', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { sendEmailVerify } = await import(
      '@/app/(auth)/utils/send-email-verify'
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

    vi.mocked(sendEmailVerify).mockResolvedValue({
      data: null,
      error: {
        name: 'validation_error',
        message: 'Email sending failed',
      },
    });

    const { verifyEmailResendAction } = await import('../verify-email-resend');
    const result = await verifyEmailResendAction();

    expect(result).toEqual({
      success: false,
      message: 'Erro ao reenviar o código',
      fieldErrors: undefined,
      payload: undefined,
    });
  });

  it('should handle exceptions and use form error handler', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { generateEmailVerificationCode } = await import(
      '@/app/(auth)/utils/generate-email-verification-code'
    );
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
    vi.mocked(generateEmailVerificationCode).mockRejectedValue(testError);

    const { verifyEmailResendAction } = await import('../verify-email-resend');
    const result = await verifyEmailResendAction();

    expect(formErrorHandler).toHaveBeenCalledWith(testError);
    expect(result.success).toBe(false);
  });

  it('should generate new verification code for authenticated user', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { generateEmailVerificationCode } = await import(
      '@/app/(auth)/utils/generate-email-verification-code'
    );
    const { sendEmailVerify } = await import(
      '@/app/(auth)/utils/send-email-verify'
    );

    const mockUser = {
      id: 'test-user-id',
      name: 'testuser',
      email: 'test@example.com',
      emailVerified: false,
      passwordHash: 'hashed-password',
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

    vi.mocked(generateEmailVerificationCode).mockResolvedValue('654321');
    vi.mocked(sendEmailVerify).mockResolvedValue({
      data: { id: 'email-id' },
      error: null,
    });

    const { verifyEmailResendAction } = await import('../verify-email-resend');
    await verifyEmailResendAction();

    expect(generateEmailVerificationCode).toHaveBeenCalledWith(
      'test-user-id',
      'test@example.com',
    );

    expect(sendEmailVerify).toHaveBeenCalledWith(
      'testuser',
      'test@example.com',
      '654321',
    );
  });

  it('should handle sendEmailVerify with different error format', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { sendEmailVerify } = await import(
      '@/app/(auth)/utils/send-email-verify'
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

    // Mock different error format
    vi.mocked(sendEmailVerify).mockResolvedValue({
      data: null,
      error: {
        name: 'invalid_parameter',
        message: 'Invalid email format',
      },
    });

    const { verifyEmailResendAction } = await import('../verify-email-resend');
    const result = await verifyEmailResendAction();

    expect(result).toEqual({
      success: false,
      message: 'Erro ao reenviar o código',
      fieldErrors: undefined,
      payload: undefined,
    });
  });
});
