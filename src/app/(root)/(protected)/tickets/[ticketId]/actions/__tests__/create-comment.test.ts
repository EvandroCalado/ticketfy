import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock all dependencies
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('@/actions/get-auth', () => ({
  getAuth: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    comment: {
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

vi.mock('@/utils/paths', () => ({
  ticketPath: vi.fn().mockReturnValue('/tickets/ticket-id'),
}));

describe('createComment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create comment successfully with valid data', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');
    const { revalidatePath } = await import('next/cache');
    const { ticketPath } = await import('@/utils/paths');

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: true,
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockComment = {
      id: 'comment-id',
      content: 'Test comment content',
      userId: 'user-id',
      ticketId: 'ticket-id',
      createdAt: new Date(),
      updatedAt: new Date(),
      user: mockUser,
      ticket: {
        id: 'ticket-id',
        title: 'Test Ticket',
        content: 'Test Description',
        status: 'OPEN' as const,
        deadline: '2024-12-31',
        bounty: 1000,
        userId: 'user-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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

    vi.mocked(prisma.comment.create).mockResolvedValue(mockComment);

    const formData = new FormData();
    formData.append('content', 'Test comment content');

    const { createComment } = await import('../create-comment');
    const result = await createComment('ticket-id', undefined, formData);

    expect(result).toEqual({
      success: true,
      message: 'Comentário criado com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(prisma.comment.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-id',
        ticketId: 'ticket-id',
        content: 'Test comment content',
      },
      include: {
        user: true,
        ticket: true,
      },
    });

    expect(ticketPath).toHaveBeenCalledWith('ticket-id');
    expect(revalidatePath).toHaveBeenCalledWith('/tickets/ticket-id');
  });

  it('should handle validation errors for invalid content', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: true,
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
    formData.append('content', ''); // Empty content

    const { createComment } = await import('../create-comment');
    const result = await createComment('ticket-id', undefined, formData);

    expect(formErrorHandler).toHaveBeenCalled();
    expect(result.success).toBe(false);
  });

  it('should handle validation errors for content too long', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    const mockUser = {
      id: 'user-id',
      name: 'johndoe',
      email: 'john@example.com',
      emailVerified: true,
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

    const longContent = 'a'.repeat(1025); // Exceeds 1024 character limit
    const formData = new FormData();
    formData.append('content', longContent);

    const { createComment } = await import('../create-comment');
    const result = await createComment('ticket-id', undefined, formData);

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
      emailVerified: true,
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
    vi.mocked(prisma.comment.create).mockRejectedValue(testError);

    const formData = new FormData();
    formData.append('content', 'Valid content');

    const { createComment } = await import('../create-comment');
    const result = await createComment('ticket-id', undefined, formData);

    expect(formErrorHandler).toHaveBeenCalledWith(testError, formData);
    expect(result.success).toBe(false);
  });

  it('should create comment with null user id when user is not authenticated', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');

    vi.mocked(getAuth).mockResolvedValue({
      user: null,
      session: null,
    });

    const mockComment = {
      id: 'comment-id',
      content: 'Test comment content',
      userId: null,
      ticketId: 'ticket-id',
      createdAt: new Date(),
      updatedAt: new Date(),
      user: null,
      ticket: {
        id: 'ticket-id',
        title: 'Test Ticket',
        content: 'Test Description',
        status: 'OPEN' as const,
        deadline: '2024-12-31',
        bounty: 1000,
        userId: 'user-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    vi.mocked(prisma.comment.create).mockResolvedValue(mockComment);

    const formData = new FormData();
    formData.append('content', 'Test comment content');

    const { createComment } = await import('../create-comment');
    const result = await createComment('ticket-id', undefined, formData);

    expect(result.success).toBe(true);
    expect(prisma.comment.create).toHaveBeenCalledWith({
      data: {
        userId: undefined,
        ticketId: 'ticket-id',
        content: 'Test comment content',
      },
      include: {
        user: true,
        ticket: true,
      },
    });
  });
});
