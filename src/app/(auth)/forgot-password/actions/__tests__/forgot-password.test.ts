import { beforeEach, describe, expect, it, vi } from 'vitest';

// Create mock functions that we can control
const mockFindUnique = vi.fn();
const mockFormErrorHandler = vi.fn();
const mockSendEmailResetPassword = vi.fn();
const mockGeneratePasswordResetLink = vi.fn();

// Mock all dependencies
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: mockFindUnique,
    },
    passwordResetToken: {
      create: vi.fn().mockResolvedValue({}),
    },
  },
}));

vi.mock('@/utils/form-error-handler', () => ({
  formErrorHandler: mockFormErrorHandler,
}));

vi.mock('@/utils/send-email-reset-password', () => ({
  sendEmailResetPassword: mockSendEmailResetPassword,
}));

vi.mock('../utils/generate-password-reset-link', () => ({
  generatePasswordResetLink: mockGeneratePasswordResetLink,
}));

vi.mock('../schemas/forgot-password', () => ({
  forgotPasswordSchema: {
    parse: vi.fn().mockReturnValue({ email: 'test@example.com' }),
  },
}));

describe('forgot-password action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export forgotPassword function', async () => {
    const { forgotPassword } = await import('../forgot-password');
    expect(typeof forgotPassword).toBe('function');
  });

  it('should return success when user exists (lines 34-41)', async () => {
    // Setup mocks for success case
    mockFindUnique.mockResolvedValue({
      id: 'user-id',
      name: 'Test User',
      email: 'test@example.com',
    });
    mockGeneratePasswordResetLink.mockResolvedValue(
      'https://example.com/reset/token123',
    );
    mockSendEmailResetPassword.mockImplementation(() => Promise.resolve());

    const { forgotPassword } = await import('../forgot-password');

    const formData = new FormData();
    formData.set('email', 'test@example.com');

    const result = await forgotPassword(null, formData);

    // Just verify that we get a result and it's successful
    expect(result).toBeDefined();
    expect(result).toHaveProperty('success', true);

    // Verify the user lookup was called
    expect(mockFindUnique).toHaveBeenCalled();
  });

  it('should return error when user not found (lines 24-30)', async () => {
    // Mock user not found
    mockFindUnique.mockResolvedValue(null);

    const { forgotPassword } = await import('../forgot-password');

    const formData = new FormData();
    formData.set('email', 'nonexistent@example.com');

    const result = await forgotPassword(null, formData);

    expect(result).toEqual({
      success: false,
      message: 'Email não cadastrado',
      fieldErrors: undefined,
      payload: undefined,
    });
  });

  it('should handle errors with formErrorHandler (catch block)', async () => {
    // Mock an error
    mockFindUnique.mockRejectedValue(new Error('Database error'));
    mockFormErrorHandler.mockReturnValue({
      success: false,
      message: 'Error handled',
      fieldErrors: undefined,
      payload: undefined,
    });

    const { forgotPassword } = await import('../forgot-password');

    const formData = new FormData();
    formData.set('email', 'test@example.com');

    const result = await forgotPassword(null, formData);

    expect(result).toEqual({
      success: false,
      message: 'Error handled',
      fieldErrors: undefined,
      payload: undefined,
    });

    // Verify formErrorHandler was called with the error and formData
    expect(mockFormErrorHandler).toHaveBeenCalledWith(
      expect.any(Error),
      formData,
    );
  });
});
