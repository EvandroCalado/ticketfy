import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock all dependencies
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('@/actions/get-auth', () => ({
  getAuth: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    ticket: {
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

vi.mock('@/utils/paths', () => ({
  signInPath: vi.fn().mockReturnValue('/sign-in'),
}));

describe('deleteTicket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete ticket successfully when user owns the ticket', async () => {
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

    const mockTicket = {
      id: 'ticket-id',
      title: 'Test Ticket',
      content: 'Test Description',
      status: 'OPEN' as const,
      deadline: '2024-12-31',
      bounty: 1000,
      userId: 'user-id',
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

    vi.mocked(prisma.ticket.delete).mockResolvedValue(mockTicket);

    const { deleteTicket } = await import('../delete-ticket');
    const result = await deleteTicket('ticket-id');

    expect(result).toEqual({
      success: true,
      message: 'Ticket excluído com sucesso',
      fieldErrors: undefined,
      payload: undefined,
    });

    expect(prisma.ticket.delete).toHaveBeenCalledWith({
      where: {
        id: 'ticket-id',
        userId: 'user-id',
      },
    });
  });

  it('should redirect to sign-in when user is not authenticated', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { redirect } = await import('next/navigation');
    const { signInPath } = await import('@/utils/paths');

    vi.mocked(getAuth).mockResolvedValue({
      user: null,
      session: null,
    });

    // Mock redirect to throw an error to simulate Next.js redirect behavior
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error('NEXT_REDIRECT');
    });

    const { deleteTicket } = await import('../delete-ticket');

    // This should throw because redirect is called
    await expect(deleteTicket('ticket-id')).rejects.toThrow('NEXT_REDIRECT');

    expect(signInPath).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith('/sign-in');
  });

  it('should return error when ticket does not exist or user does not own it', async () => {
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

    // Simulate Prisma P2025 error (record not found)
    const prismaError = new Error('Record not found') as Error & {
      code: string;
    };
    prismaError.code = 'P2025';
    vi.mocked(prisma.ticket.delete).mockRejectedValue(prismaError);

    const { deleteTicket } = await import('../delete-ticket');
    const result = await deleteTicket('non-existent-ticket-id');

    expect(result).toEqual({
      success: false,
      message: 'Você não tem permissão para excluir este ticket',
      fieldErrors: undefined,
      payload: undefined,
    });
  });

  it('should handle other database errors', async () => {
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

    const testError = new Error('Database connection error');
    vi.mocked(prisma.ticket.delete).mockRejectedValue(testError);

    const { deleteTicket } = await import('../delete-ticket');
    const result = await deleteTicket('ticket-id');

    expect(formErrorHandler).toHaveBeenCalledWith(testError);
    expect(result.success).toBe(false);
  });

  it('should validate ticket id with schema', async () => {
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

    const mockTicket = {
      id: 'valid-ticket-id',
      title: 'Test Ticket',
      content: 'Test Description',
      status: 'OPEN' as const,
      deadline: '2024-12-31',
      bounty: 1000,
      userId: 'user-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(prisma.ticket.delete).mockResolvedValue(mockTicket);

    const { deleteTicket } = await import('../delete-ticket');
    await deleteTicket('valid-ticket-id');

    expect(prisma.ticket.delete).toHaveBeenCalledWith({
      where: {
        id: 'valid-ticket-id',
        userId: 'user-id',
      },
    });
  });
});
