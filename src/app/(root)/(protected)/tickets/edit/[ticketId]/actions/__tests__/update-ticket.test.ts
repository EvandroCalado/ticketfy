import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock all dependencies
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('@/actions/get-auth', () => ({
  getAuth: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    ticket: {
      findFirst: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock('@/utils/form-error-handler', () => ({
  formErrorHandler: vi.fn(),
}));

vi.mock('@/utils/format-currency', () => ({
  toCent: vi.fn(),
}));

vi.mock('@/utils/paths', () => ({
  signInPath: vi.fn(() => '/auth/sign-in'),
  ticketPath: vi.fn((id: string) => `/tickets/${id}`),
  ticketsPath: vi.fn(() => '/tickets'),
}));

vi.mock('../../schemas/update-ticket', () => ({
  updateTicketSchema: {
    parse: vi.fn(),
  },
}));

describe('updateTicket', () => {
  const mockTicketId = 'ticket-123';
  const mockUserId = 'user-123';
  const mockUser = {
    id: mockUserId,
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
    passwordHash: 'hashed-password',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  };
  const mockSession = {
    id: 'session-123',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    expiresAt: new Date('2024-12-31'),
    userId: mockUserId,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully update a ticket when user is authenticated and owns the ticket', async () => {
    // Setup mocks
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');
    const { toCent } = await import('@/utils/format-currency');
    const { updateTicketSchema } = await import('../../schemas/update-ticket');

    const mockFormData = new FormData();
    mockFormData.append('title', 'Updated Ticket Title');
    mockFormData.append('content', 'Updated content for the ticket');
    mockFormData.append('status', 'IN_PROGRESS');
    mockFormData.append('deadline', '2024-12-31');
    mockFormData.append('bounty', '150.75');

    const mockParsedData = {
      title: 'Updated Ticket Title',
      content: 'Updated content for the ticket',
      status: 'IN_PROGRESS' as const,
      deadline: '2024-12-31',
      bounty: '150.75',
    };

    const mockTicket = {
      id: mockTicketId,
      userId: mockUserId,
      title: 'Original Title',
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    vi.mocked(updateTicketSchema.parse).mockReturnValue(mockParsedData);
    vi.mocked(prisma.ticket.findFirst).mockResolvedValue(mockTicket as never);
    vi.mocked(prisma.ticket.update).mockResolvedValue({
      ...mockTicket,
      ...mockParsedData,
    } as never);
    vi.mocked(toCent).mockReturnValue('15075');

    const { updateTicket } = await import('../update-ticket');
    const result = await updateTicket(mockTicketId, {}, mockFormData);

    expect(result).toEqual({
      success: true,
      message: 'Ticket atualizado com sucesso',
      payload: undefined,
      fieldErrors: undefined,
    });

    expect(getAuth).toHaveBeenCalledTimes(1);
    expect(updateTicketSchema.parse).toHaveBeenCalledWith({
      title: 'Updated Ticket Title',
      content: 'Updated content for the ticket',
      status: 'IN_PROGRESS',
      deadline: '2024-12-31',
      bounty: '150.75',
    });
    expect(prisma.ticket.findFirst).toHaveBeenCalledWith({
      where: { id: mockTicketId, userId: mockUserId },
    });
    expect(toCent).toHaveBeenCalledWith('150.75');
    expect(prisma.ticket.update).toHaveBeenCalledWith({
      where: { id: mockTicketId },
      data: {
        ...mockParsedData,
        bounty: 15075,
      },
    });
    expect(revalidatePath).toHaveBeenNthCalledWith(
      1,
      `/tickets/${mockTicketId}`,
    );
    expect(revalidatePath).toHaveBeenNthCalledWith(2, '/tickets');
  });

  it('should redirect to sign in when user is not authenticated', async () => {
    const { getAuth } = await import('@/actions/get-auth');

    vi.mocked(getAuth).mockResolvedValue({
      user: null,
      session: null,
    });

    const mockFormData = new FormData();
    mockFormData.append('title', 'Test Title');

    const { updateTicket } = await import('../update-ticket');
    await updateTicket(mockTicketId, {}, mockFormData);

    expect(redirect).toHaveBeenCalledWith('/auth/sign-in');
    expect(getAuth).toHaveBeenCalledTimes(1);
  });

  it('should return error when user does not own the ticket', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');
    const { updateTicketSchema } = await import('../../schemas/update-ticket');

    const mockFormData = new FormData();
    mockFormData.append('title', 'Updated Ticket Title');

    const mockParsedData = {
      title: 'Updated Ticket Title',
      content: 'Updated content',
      status: 'OPEN' as const,
      deadline: '2024-12-31',
      bounty: '100.00',
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    vi.mocked(updateTicketSchema.parse).mockReturnValue(mockParsedData);
    vi.mocked(prisma.ticket.findFirst).mockResolvedValue(null); // Ticket not found

    const { updateTicket } = await import('../update-ticket');
    const result = await updateTicket(mockTicketId, {}, mockFormData);

    expect(result).toEqual({
      success: false,
      message: 'Você não tem permissão para atualizar este ticket',
    });

    expect(prisma.ticket.findFirst).toHaveBeenCalledWith({
      where: { id: mockTicketId, userId: mockUserId },
    });
    expect(prisma.ticket.update).not.toHaveBeenCalled();
  });

  it('should handle validation errors from schema', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { updateTicketSchema } = await import('../../schemas/update-ticket');
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    const mockFormData = new FormData();
    mockFormData.append('title', 'Ab'); // Too short

    const mockValidationError = new Error('Validation failed');
    const mockErrorResult = {
      success: false,
      message: undefined,
      fieldErrors: {
        title: ['Título deve ter pelo menos 3 caracteres'],
      },
      payload: mockFormData,
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    vi.mocked(updateTicketSchema.parse).mockImplementation(() => {
      throw mockValidationError;
    });

    vi.mocked(formErrorHandler).mockReturnValue(mockErrorResult);

    const { updateTicket } = await import('../update-ticket');
    const result = await updateTicket(mockTicketId, {}, mockFormData);

    expect(result).toEqual(mockErrorResult);
    expect(formErrorHandler).toHaveBeenCalledWith(
      mockValidationError,
      mockFormData,
    );
  });

  it('should handle database errors', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');
    const { updateTicketSchema } = await import('../../schemas/update-ticket');
    const { formErrorHandler } = await import('@/utils/form-error-handler');
    const { toCent } = await import('@/utils/format-currency');

    const mockFormData = new FormData();
    mockFormData.append('title', 'Valid Title');

    const mockParsedData = {
      title: 'Valid Title',
      content: 'Valid content for the ticket',
      status: 'OPEN',
      deadline: '2024-12-31',
      bounty: '100.00',
    };

    const mockTicket = {
      id: mockTicketId,
      userId: mockUserId,
    };

    const mockDatabaseError = new Error('Database connection failed');
    const mockErrorResult = {
      success: false,
      message: 'Database connection failed',
      fieldErrors: undefined,
      payload: mockFormData,
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    vi.mocked(updateTicketSchema.parse).mockReturnValue(
      mockParsedData as never,
    );
    vi.mocked(prisma.ticket.findFirst).mockResolvedValue(mockTicket as never);
    vi.mocked(toCent).mockReturnValue('10000');
    vi.mocked(prisma.ticket.update).mockRejectedValue(mockDatabaseError);
    vi.mocked(formErrorHandler).mockReturnValue(mockErrorResult);

    const { updateTicket } = await import('../update-ticket');
    const result = await updateTicket(mockTicketId, {}, mockFormData);

    expect(result).toEqual(mockErrorResult);
    expect(formErrorHandler).toHaveBeenCalledWith(
      mockDatabaseError,
      mockFormData,
    );
  });

  it('should handle FormData with multiple entries correctly', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');
    const { updateTicketSchema } = await import('../../schemas/update-ticket');
    const { toCent } = await import('@/utils/format-currency');

    const mockFormData = new FormData();
    mockFormData.append('title', 'Multi Entry Title');
    mockFormData.append(
      'content',
      'This is a long content with more than 10 characters',
    );
    mockFormData.append('status', 'DONE');
    mockFormData.append('deadline', '2024-01-01');
    mockFormData.append('bounty', '250.50');

    const mockParsedData = {
      title: 'Multi Entry Title',
      content: 'This is a long content with more than 10 characters',
      status: 'DONE' as const,
      deadline: '2024-01-01',
      bounty: '250.50',
    };

    const mockTicket = {
      id: mockTicketId,
      userId: mockUserId,
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    vi.mocked(updateTicketSchema.parse).mockReturnValue(mockParsedData);
    vi.mocked(prisma.ticket.findFirst).mockResolvedValue(mockTicket as never);
    vi.mocked(prisma.ticket.update).mockResolvedValue({
      ...mockTicket,
      ...mockParsedData,
    } as never);
    vi.mocked(toCent).mockReturnValue('25050');

    const { updateTicket } = await import('../update-ticket');
    const result = await updateTicket(mockTicketId, {}, mockFormData);

    expect(result.success).toBe(true);
    expect(updateTicketSchema.parse).toHaveBeenCalledWith({
      title: 'Multi Entry Title',
      content: 'This is a long content with more than 10 characters',
      status: 'DONE',
      deadline: '2024-01-01',
      bounty: '250.50',
    });
    expect(toCent).toHaveBeenCalledWith('250.50');
    expect(prisma.ticket.update).toHaveBeenCalledWith({
      where: { id: mockTicketId },
      data: {
        ...mockParsedData,
        bounty: 25050,
      },
    });
  });

  it('should handle empty FormData gracefully', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { updateTicketSchema } = await import('../../schemas/update-ticket');
    const { formErrorHandler } = await import('@/utils/form-error-handler');

    const mockFormData = new FormData(); // Empty form data

    const mockValidationError = new Error('Missing required fields');
    const mockErrorResult = {
      success: false,
      message: undefined,
      fieldErrors: {
        title: ['Título é obrigatório'],
        content: ['Conteúdo é obrigatório'],
      },
      payload: mockFormData,
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    vi.mocked(updateTicketSchema.parse).mockImplementation(() => {
      throw mockValidationError;
    });

    vi.mocked(formErrorHandler).mockReturnValue(mockErrorResult);

    const { updateTicket } = await import('../update-ticket');
    const result = await updateTicket(mockTicketId, {}, mockFormData);

    expect(result).toEqual(mockErrorResult);
    expect(updateTicketSchema.parse).toHaveBeenCalledWith({});
  });

  it('should convert bounty to cents correctly', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');
    const { updateTicketSchema } = await import('../../schemas/update-ticket');
    const { toCent } = await import('@/utils/format-currency');

    const mockFormData = new FormData();
    mockFormData.append('title', 'Bounty Test');
    mockFormData.append('content', 'Testing bounty conversion');
    mockFormData.append('status', 'OPEN');
    mockFormData.append('deadline', '2024-12-31');
    mockFormData.append('bounty', '99.99');

    const mockParsedData = {
      title: 'Bounty Test',
      content: 'Testing bounty conversion',
      status: 'OPEN' as const,
      deadline: '2024-12-31',
      bounty: '99.99',
    };

    const mockTicket = { id: mockTicketId, userId: mockUserId };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    vi.mocked(updateTicketSchema.parse).mockReturnValue(
      mockParsedData as never,
    );
    vi.mocked(prisma.ticket.findFirst).mockResolvedValue(mockTicket as never);
    vi.mocked(prisma.ticket.update).mockResolvedValue({
      ...mockTicket,
      ...mockParsedData,
    } as never);
    vi.mocked(toCent).mockReturnValue('9999');

    const { updateTicket } = await import('../update-ticket');
    await updateTicket(mockTicketId, {}, mockFormData);

    expect(toCent).toHaveBeenCalledWith('99.99');
    expect(prisma.ticket.update).toHaveBeenCalledWith({
      where: { id: mockTicketId },
      data: {
        ...mockParsedData,
        bounty: 9999,
      },
    });
  });

  it('should call revalidatePath for both ticket and tickets paths', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');
    const { updateTicketSchema } = await import('../../schemas/update-ticket');
    const { toCent } = await import('@/utils/format-currency');

    const mockFormData = new FormData();
    mockFormData.append('title', 'Revalidation Test');
    mockFormData.append('content', 'Testing path revalidation');
    mockFormData.append('status', 'IN_PROGRESS');
    mockFormData.append('deadline', '2024-12-31');
    mockFormData.append('bounty', '75.25');

    const mockParsedData = {
      title: 'Revalidation Test',
      content: 'Testing path revalidation',
      status: 'IN_PROGRESS' as const,
      deadline: '2024-12-31',
      bounty: '75.25',
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    vi.mocked(updateTicketSchema.parse).mockReturnValue(
      mockParsedData as never,
    );
    vi.mocked(prisma.ticket.findFirst).mockResolvedValue({
      id: mockTicketId,
      userId: mockUserId,
    } as never);
    vi.mocked(prisma.ticket.update).mockResolvedValue({
      id: mockTicketId,
      ...mockParsedData,
    } as never);
    vi.mocked(toCent).mockReturnValue('7525');

    const { updateTicket } = await import('../update-ticket');
    await updateTicket(mockTicketId, {}, mockFormData);

    expect(revalidatePath).toHaveBeenCalledTimes(2);
    expect(revalidatePath).toHaveBeenNthCalledWith(
      1,
      `/tickets/${mockTicketId}`,
    );
    expect(revalidatePath).toHaveBeenNthCalledWith(2, '/tickets');
  });

  it('should handle different ticket statuses correctly', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');
    const { updateTicketSchema } = await import('../../schemas/update-ticket');
    const { toCent } = await import('@/utils/format-currency');

    const testStatuses = ['OPEN', 'IN_PROGRESS', 'DONE'] as const;

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    vi.mocked(prisma.ticket.findFirst).mockResolvedValue({
      id: mockTicketId,
      userId: mockUserId,
    } as never);

    vi.mocked(toCent).mockReturnValue('10000');

    for (const status of testStatuses) {
      const mockFormData = new FormData();
      mockFormData.append('title', `Status ${status} Test`);
      mockFormData.append('content', 'Testing different status values');
      mockFormData.append('status', status);
      mockFormData.append('deadline', '2024-12-31');
      mockFormData.append('bounty', '100.00');

      const mockParsedData = {
        title: `Status ${status} Test`,
        content: 'Testing different status values',
        status,
        deadline: '2024-12-31',
        bounty: '100.00',
      };

      vi.mocked(updateTicketSchema.parse).mockReturnValue(
        mockParsedData as never,
      );
      vi.mocked(prisma.ticket.update).mockResolvedValue({
        id: mockTicketId,
        ...mockParsedData,
      } as never);

      const { updateTicket } = await import('../update-ticket');
      const result = await updateTicket(mockTicketId, {}, mockFormData);

      expect(result.success).toBe(true);
      expect(prisma.ticket.update).toHaveBeenCalledWith({
        where: { id: mockTicketId },
        data: {
          ...mockParsedData,
          bounty: 10000,
        },
      });
    }
  });

  it('should preserve other fields when updating bounty', async () => {
    const { getAuth } = await import('@/actions/get-auth');
    const { prisma } = await import('@/lib/prisma');
    const { updateTicketSchema } = await import('../../schemas/update-ticket');
    const { toCent } = await import('@/utils/format-currency');

    const mockFormData = new FormData();
    mockFormData.append('title', 'Preserve Fields Test');
    mockFormData.append('content', 'Testing field preservation during update');
    mockFormData.append('status', 'DONE');
    mockFormData.append('deadline', '2025-01-01');
    mockFormData.append('bounty', '500.00');

    const mockParsedData = {
      title: 'Preserve Fields Test',
      content: 'Testing field preservation during update',
      status: 'DONE' as const,
      deadline: '2025-01-01',
      bounty: '500.00',
    };

    vi.mocked(getAuth).mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    vi.mocked(updateTicketSchema.parse).mockReturnValue(
      mockParsedData as never,
    );
    vi.mocked(prisma.ticket.findFirst).mockResolvedValue({
      id: mockTicketId,
      userId: mockUserId,
    } as never);
    vi.mocked(toCent).mockReturnValue('50000');
    vi.mocked(prisma.ticket.update).mockResolvedValue({
      id: mockTicketId,
      ...mockParsedData,
      bounty: 50000,
    } as never);

    const { updateTicket } = await import('../update-ticket');
    const result = await updateTicket(mockTicketId, {}, mockFormData);

    expect(result.success).toBe(true);
    expect(prisma.ticket.update).toHaveBeenCalledWith({
      where: { id: mockTicketId },
      data: {
        title: 'Preserve Fields Test',
        content: 'Testing field preservation during update',
        status: 'DONE',
        deadline: '2025-01-01',
        bounty: 50000,
      },
    });
  });
});
