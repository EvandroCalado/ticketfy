import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock all dependencies
vi.mock('@/actions/get-auth', () => ({
  getAuth: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    comment: {
      findUnique: vi.fn(),
      delete: vi.fn(),
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

describe('deleteComment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete comment successfully when user owns the comment', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');

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

    vi.mocked(prisma.comment.findUnique).mockResolvedValue(mockComment);
    vi.mocked(prisma.comment.delete).mockResolvedValue(mockComment);

    const formData = new FormData();

    const { deleteComment } = await import('../delete-comment');
    const result = await deleteComment('comment-id', undefined, formData);

    expect(result).toEqual({
      success: true,
      message: 'Comentário excluído com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(prisma.comment.findUnique).toHaveBeenCalledWith({
      where: { id: 'comment-id', userId: 'user-id' },
    });

    expect(prisma.comment.delete).toHaveBeenCalledWith({
      where: { id: 'comment-id' },
    });
  });

  it('should return error when comment does not exist', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');

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
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });

    vi.mocked(prisma.comment.findUnique).mockResolvedValue(null);

    const formData = new FormData();

    const { deleteComment } = await import('../delete-comment');
    const result = await deleteComment(
      'non-existent-comment-id',
      undefined,
      formData,
    );

    expect(result).toEqual({
      success: false,
      message: 'Você não tem permissão para excluir este comentário',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(prisma.comment.findUnique).toHaveBeenCalledWith({
      where: { id: 'non-existent-comment-id', userId: 'user-id' },
    });

    expect(prisma.comment.delete).not.toHaveBeenCalled();
  });

  it('should return error when user does not own the comment', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');

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

    // Comment belongs to different user, so findUnique with userId filter returns null
    vi.mocked(prisma.comment.findUnique).mockResolvedValue(null);

    const formData = new FormData();

    const { deleteComment } = await import('../delete-comment');
    const result = await deleteComment(
      'other-user-comment-id',
      undefined,
      formData,
    );

    expect(result).toEqual({
      success: false,
      message: 'Você não tem permissão para excluir este comentário',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(prisma.comment.delete).not.toHaveBeenCalled();
  });

  it('should handle database errors during deletion', async () => {
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

    const mockComment = {
      id: 'comment-id',
      content: 'Test comment content',
      userId: 'user-id',
      ticketId: 'ticket-id',
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

    vi.mocked(prisma.comment.findUnique).mockResolvedValue(mockComment);

    const testError = new Error('Database error');
    vi.mocked(prisma.comment.delete).mockRejectedValue(testError);

    const formData = new FormData();

    const { deleteComment } = await import('../delete-comment');
    const result = await deleteComment('comment-id', undefined, formData);

    expect(formErrorHandler).toHaveBeenCalledWith(testError, formData);
    expect(result.success).toBe(false);
  });

  it('should handle when user is null', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');

    vi.mocked(getAuth).mockResolvedValue({
      user: null,
      session: null,
    });

    vi.mocked(prisma.comment.findUnique).mockResolvedValue(null);

    const formData = new FormData();

    const { deleteComment } = await import('../delete-comment');
    const result = await deleteComment('comment-id', undefined, formData);

    expect(result).toEqual({
      success: false,
      message: 'Você não tem permissão para excluir este comentário',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(prisma.comment.findUnique).toHaveBeenCalledWith({
      where: { id: 'comment-id', userId: undefined },
    });
  });
});
