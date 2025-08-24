import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

// Create mock functions that we can control
const mockSchemaParse = vi.fn();
const mockHashToken = vi.fn();
const mockHashPassword = vi.fn();
const mockFormErrorHandler = vi.fn();
const mockPrismaFindUnique = vi.fn();
const mockPrismaDelete = vi.fn();
const mockPrismaDeleteMany = vi.fn();
const mockPrismaUpdate = vi.fn();

// Mock dependencies
vi.mock('../schemas/reset-password', () => ({
  resetPasswordSchema: {
    parse: mockSchemaParse,
  },
}));

vi.mock('@/utils/hash-token', () => ({
  hashToken: mockHashToken,
}));

vi.mock('../utils/hash-password', () => ({
  hashPassword: mockHashPassword,
}));

vi.mock('@/utils/form-error-handler', () => ({
  formErrorHandler: mockFormErrorHandler,
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    passwordResetToken: {
      findUnique: mockPrismaFindUnique,
      delete: mockPrismaDelete,
    },
    session: {
      deleteMany: mockPrismaDeleteMany,
    },
    user: {
      update: mockPrismaUpdate,
    },
  },
}));

describe('reset-password action', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock return values
    mockSchemaParse.mockReturnValue({
      password: 'newpassword123',
    });
    mockHashToken.mockReturnValue('hashed-token-id');
    mockHashPassword.mockResolvedValue('hashed-new-password');
  });

  it('should export resetPassword function', async () => {
    const { resetPassword } = await import('../reset-password');
    expect(typeof resetPassword).toBe('function');
  });

  it('should successfully reset password when token is valid and not expired', async () => {
    // Setup mocks for successful password reset
    const validToken = {
      tokenHash: 'hashed-token-id',
      userId: 'user-id-123',
      expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
    };

    mockPrismaFindUnique.mockResolvedValue(validToken);
    mockPrismaDelete.mockResolvedValue(validToken);
    mockPrismaDeleteMany.mockResolvedValue({ count: 2 });
    mockPrismaUpdate.mockResolvedValue({
      id: 'user-id-123',
      passwordHash: 'hashed-new-password',
    });

    const { resetPassword } = await import('../reset-password');

    const formData = new FormData();
    formData.set('password', 'newpassword123');
    formData.set('confirmPassword', 'newpassword123');

    const result = await resetPassword('token-id-123', null, formData);

    expect(result).toEqual({
      success: true,
      message: 'Senha redefinida com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    });

    // Verify key operations were called
    expect(mockHashToken).toHaveBeenCalledWith('token-id-123');
    expect(mockPrismaFindUnique).toHaveBeenCalledWith({
      where: { tokenHash: 'hashed-token-id' },
    });
    expect(mockPrismaDelete).toHaveBeenCalledWith({
      where: { tokenHash: 'hashed-token-id' },
    });
    expect(mockPrismaDeleteMany).toHaveBeenCalledWith({
      where: { userId: 'user-id-123' },
    });
    expect(mockPrismaUpdate).toHaveBeenCalledWith({
      where: { id: 'user-id-123' },
      data: { passwordHash: expect.any(String) },
    });
  });

  it('should return error when token is not found', async () => {
    // Mock token not found
    mockPrismaFindUnique.mockResolvedValue(null);

    const { resetPassword } = await import('../reset-password');

    const formData = new FormData();
    formData.set('password', 'newpassword123');
    formData.set('confirmPassword', 'newpassword123');

    const result = await resetPassword('invalid-token', null, formData);

    expect(result).toEqual({
      success: false,
      message: 'Token inválido ou expirado',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(mockHashToken).toHaveBeenCalledWith('invalid-token');
    expect(mockPrismaFindUnique).toHaveBeenCalledWith({
      where: { tokenHash: 'hashed-token-id' },
    });

    // Verify that no further operations are performed
    expect(mockPrismaDeleteMany).not.toHaveBeenCalled();
    expect(mockPrismaUpdate).not.toHaveBeenCalled();
  });

  it('should return error when token is expired', async () => {
    // Setup expired token
    const expiredToken = {
      tokenHash: 'hashed-token-id',
      userId: 'user-id-123',
      expiresAt: new Date(Date.now() - 3600000), // 1 hour ago (expired)
    };

    mockPrismaFindUnique.mockResolvedValue(expiredToken);
    mockPrismaDelete.mockResolvedValue(expiredToken);

    const { resetPassword } = await import('../reset-password');

    const formData = new FormData();
    formData.set('password', 'newpassword123');
    formData.set('confirmPassword', 'newpassword123');

    const result = await resetPassword('expired-token', null, formData);

    expect(result).toEqual({
      success: false,
      message: 'Token inválido ou expirado',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(mockPrismaFindUnique).toHaveBeenCalledWith({
      where: { tokenHash: 'hashed-token-id' },
    });
    expect(mockPrismaDelete).toHaveBeenCalledWith({
      where: { tokenHash: 'hashed-token-id' },
    });

    // Verify that no further operations are performed after token deletion
    expect(mockPrismaDeleteMany).not.toHaveBeenCalled();
    expect(mockPrismaUpdate).not.toHaveBeenCalled();
  });

  it('should delete token even when token is found but expired', async () => {
    // This test ensures the token is deleted even when it's expired
    const expiredToken = {
      tokenHash: 'hashed-token-id',
      userId: 'user-id-123',
      expiresAt: new Date(Date.now() - 1000), // Just expired
    };

    mockPrismaFindUnique.mockResolvedValue(expiredToken);
    mockPrismaDelete.mockResolvedValue(expiredToken);

    const { resetPassword } = await import('../reset-password');

    const formData = new FormData();
    formData.set('password', 'newpassword123');
    formData.set('confirmPassword', 'newpassword123');

    await resetPassword('expired-token', null, formData);

    // Verify token was deleted even though it was expired
    expect(mockPrismaDelete).toHaveBeenCalledWith({
      where: { tokenHash: 'hashed-token-id' },
    });
  });

  it('should handle validation errors with formErrorHandler', async () => {
    // Create a proper ZodError for validation failure
    const zodError = new ZodError([
      {
        code: 'too_small',
        minimum: 6,
        inclusive: true,
        origin: 'string',
        message: 'Senha deve ter pelo menos 6 caracteres',
        path: ['password'],
      },
    ]);

    mockSchemaParse.mockImplementation(() => {
      throw zodError;
    });

    mockFormErrorHandler.mockReturnValue({
      success: false,
      message: undefined,
      fieldErrors: { password: ['Senha deve ter pelo menos 6 caracteres'] },
      payload: expect.any(FormData),
    });

    const { resetPassword } = await import('../reset-password');

    const formData = new FormData();
    formData.set('password', '123');
    formData.set('confirmPassword', '456');

    const result = await resetPassword('token-id', null, formData);

    expect(result).toEqual({
      success: false,
      message: undefined,
      fieldErrors: { password: ['Senha deve ter pelo menos 6 caracteres'] },
      payload: expect.any(FormData),
    });

    expect(mockFormErrorHandler).toHaveBeenCalledWith(
      expect.any(ZodError),
      formData,
    );

    // Verify no database operations were performed due to validation error
    expect(mockPrismaFindUnique).not.toHaveBeenCalled();
  });

  it('should handle database errors with formErrorHandler', async () => {
    // Mock database error during findUnique
    const databaseError = new Error('Database connection failed');
    mockPrismaFindUnique.mockRejectedValue(databaseError);

    mockFormErrorHandler.mockReturnValue({
      success: false,
      message: 'Database connection failed',
      fieldErrors: undefined,
      payload: undefined,
    });

    const { resetPassword } = await import('../reset-password');

    const formData = new FormData();
    formData.set('password', 'newpassword123');
    formData.set('confirmPassword', 'newpassword123');

    const result = await resetPassword('token-id', null, formData);

    expect(result).toEqual({
      success: false,
      message: 'Database connection failed',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(mockFormErrorHandler).toHaveBeenCalledWith(databaseError, formData);
  });

  it('should handle errors during session deletion', async () => {
    // Setup valid token but error during session deletion
    const validToken = {
      tokenHash: 'hashed-token-id',
      userId: 'user-id-123',
      expiresAt: new Date(Date.now() + 3600000),
    };

    mockPrismaFindUnique.mockResolvedValue(validToken);
    mockPrismaDelete.mockResolvedValue(validToken);

    // Mock error during session deletion
    const sessionError = new Error('Session deletion failed');
    mockPrismaDeleteMany.mockRejectedValue(sessionError);

    mockFormErrorHandler.mockReturnValue({
      success: false,
      message: 'Session deletion failed',
      fieldErrors: undefined,
      payload: undefined,
    });

    const { resetPassword } = await import('../reset-password');

    const formData = new FormData();
    formData.set('password', 'newpassword123');
    formData.set('confirmPassword', 'newpassword123');

    const result = await resetPassword('token-id', null, formData);

    expect(result).toEqual({
      success: false,
      message: 'Session deletion failed',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(mockFormErrorHandler).toHaveBeenCalledWith(sessionError, formData);

    // Verify that token operations were called but user update was not
    expect(mockPrismaFindUnique).toHaveBeenCalled();
    expect(mockPrismaDelete).toHaveBeenCalled();
    expect(mockPrismaDeleteMany).toHaveBeenCalled();
    expect(mockPrismaUpdate).not.toHaveBeenCalled();
  });

  it('should handle errors during user password update', async () => {
    // Setup valid token and successful operations until user update
    const validToken = {
      tokenHash: 'hashed-token-id',
      userId: 'user-id-123',
      expiresAt: new Date(Date.now() + 3600000),
    };

    mockPrismaFindUnique.mockResolvedValue(validToken);
    mockPrismaDelete.mockResolvedValue(validToken);
    mockPrismaDeleteMany.mockResolvedValue({ count: 1 });

    // Mock error during user update
    const updateError = new Error('User update failed');
    mockPrismaUpdate.mockRejectedValue(updateError);

    mockFormErrorHandler.mockReturnValue({
      success: false,
      message: 'User update failed',
      fieldErrors: undefined,
      payload: undefined,
    });

    const { resetPassword } = await import('../reset-password');

    const formData = new FormData();
    formData.set('password', 'newpassword123');
    formData.set('confirmPassword', 'newpassword123');

    const result = await resetPassword('token-id', null, formData);

    expect(result).toEqual({
      success: false,
      message: 'User update failed',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(mockFormErrorHandler).toHaveBeenCalledWith(updateError, formData);

    // Verify all operations up to user update were called
    expect(mockPrismaDeleteMany).toHaveBeenCalled();
    expect(mockPrismaUpdate).toHaveBeenCalled();
  });
});
