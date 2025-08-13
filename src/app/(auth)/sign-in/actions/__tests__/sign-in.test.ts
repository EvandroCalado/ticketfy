import { describe, expect, it, vi } from 'vitest';

// Create mock functions that we can control
const mockVerify = vi.fn();
const mockSetSessionCookie = vi.fn();
const mockCreateSession = vi.fn();
const mockFindUnique = vi.fn();
const mockGenerateRandomToken = vi.fn();
const mockFormErrorHandler = vi.fn();

// Mock dependencies
vi.mock('@node-rs/argon2', () => ({
  verify: mockVerify,
}));

vi.mock('@/actions/set-session-cookie', () => ({
  setSessionCookie: mockSetSessionCookie,
}));

vi.mock('@/lib/auth', () => ({
  createSession: mockCreateSession,
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: mockFindUnique,
    },
  },
}));

vi.mock('@/utils/generate-random-token', () => ({
  generateRandomToken: mockGenerateRandomToken,
}));

vi.mock('@/utils/form-error-handler', () => ({
  formErrorHandler: mockFormErrorHandler,
}));

const mockSchemaParse = vi.fn();

vi.mock('../schemas/sign-in', () => ({
  signInSchema: {
    parse: mockSchemaParse,
  },
}));

describe('sign-in action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock return value
    mockSchemaParse.mockReturnValue({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should export signIn function', async () => {
    const { signIn } = await import('../sign-in');
    expect(typeof signIn).toBe('function');
  });

  it('should return success when credentials are valid', async () => {
    // Setup mocks for successful login
    mockFindUnique.mockResolvedValue({
      id: 'user-id',
      email: 'test@example.com',
      passwordHash: 'hashed-password',
    });
    mockVerify.mockResolvedValue(true);
    mockGenerateRandomToken.mockReturnValue('random-token');
    mockCreateSession.mockResolvedValue({
      id: 'session-id',
      expiresAt: new Date(),
    });
    mockSetSessionCookie.mockResolvedValue(undefined);

    const { signIn } = await import('../sign-in');

    const formData = new FormData();
    formData.set('email', 'test@example.com');
    formData.set('password', 'password123');

    const result = await signIn(null, formData);

    expect(result).toEqual({
      success: true,
      message: 'Usuário logado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
    expect(mockVerify).toHaveBeenCalledWith('hashed-password', 'password123');
    expect(mockGenerateRandomToken).toHaveBeenCalled();
    expect(mockCreateSession).toHaveBeenCalledWith('random-token', 'user-id');
    expect(mockSetSessionCookie).toHaveBeenCalled();
  });

  it('should return error when user is not found (lines 30-36)', async () => {
    // Mock schema to return different email for this test
    mockSchemaParse.mockReturnValue({
      email: 'nonexistent@example.com',
      password: 'password123',
    });
    // Mock user not found
    mockFindUnique.mockResolvedValue(null);

    const { signIn } = await import('../sign-in');

    const formData = new FormData();
    formData.set('email', 'nonexistent@example.com');
    formData.set('password', 'password123');

    const result = await signIn(null, formData);

    expect(result).toEqual({
      success: false,
      message: 'Credenciais inválidas',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { email: 'nonexistent@example.com' },
    });
    // Verify password verification is not called when user doesn't exist
    expect(mockVerify).not.toHaveBeenCalled();
  });

  it('should return error when password is invalid (lines 41-47)', async () => {
    // Mock schema to return different password for this test
    mockSchemaParse.mockReturnValue({
      email: 'test@example.com',
      password: 'wrongpassword',
    });
    // Setup user found but invalid password
    mockFindUnique.mockResolvedValue({
      id: 'user-id',
      email: 'test@example.com',
      passwordHash: 'hashed-password',
    });
    mockVerify.mockResolvedValue(false); // Invalid password

    const { signIn } = await import('../sign-in');

    const formData = new FormData();
    formData.set('email', 'test@example.com');
    formData.set('password', 'wrongpassword');

    const result = await signIn(null, formData);

    expect(result).toEqual({
      success: false,
      message: 'Credenciais inválidas',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(mockFindUnique).toHaveBeenCalled();
    expect(mockVerify).toHaveBeenCalledWith('hashed-password', 'wrongpassword');
    // Verify session creation is not called when password is invalid
    expect(mockGenerateRandomToken).not.toHaveBeenCalled();
    expect(mockCreateSession).not.toHaveBeenCalled();
  });

  it('should handle errors with formErrorHandler (lines 61-62)', async () => {
    // Mock database error
    mockFindUnique.mockRejectedValue(new Error('Database error'));
    mockFormErrorHandler.mockReturnValue({
      success: false,
      message: 'Database error',
      fieldErrors: undefined,
      payload: undefined,
    });

    const { signIn } = await import('../sign-in');

    const formData = new FormData();
    formData.set('email', 'test@example.com');
    formData.set('password', 'password123');

    const result = await signIn(null, formData);

    expect(result).toEqual({
      success: false,
      message: 'Database error',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(mockFormErrorHandler).toHaveBeenCalledWith(
      expect.any(Error),
      formData,
    );
  });
});
