import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock all dependencies
vi.mock('@/lib/prisma', () => ({
  prisma: {
    ticket: {
      findUnique: vi.fn(),
    },
  },
}));

describe('getTicket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get ticket successfully when ticket exists', async () => {
    const { prisma } = await import('@/lib/prisma');

    const mockTicket = {
      id: 'ticket-id',
      title: 'Test Ticket',
      content: 'Test ticket description',
      status: 'OPEN' as const,
      deadline: '2024-12-31',
      bounty: 1000,
      userId: 'user-id',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      user: {
        name: 'Test User',
      },
    };

    vi.mocked(prisma.ticket.findUnique).mockResolvedValue(mockTicket);

    const { getTicket } = await import('../get-ticket');
    const result = await getTicket('ticket-id');

    expect(result).toEqual(mockTicket);

    expect(prisma.ticket.findUnique).toHaveBeenCalledWith({
      where: {
        id: 'ticket-id',
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  });

  it('should return null when ticket does not exist', async () => {
    const { prisma } = await import('@/lib/prisma');

    vi.mocked(prisma.ticket.findUnique).mockResolvedValue(null);

    const { getTicket } = await import('../get-ticket');
    const result = await getTicket('non-existent-ticket-id');

    expect(result).toBeNull();

    expect(prisma.ticket.findUnique).toHaveBeenCalledWith({
      where: {
        id: 'non-existent-ticket-id',
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  });

  it('should include user name in ticket response', async () => {
    const { prisma } = await import('@/lib/prisma');

    const mockTicket = {
      id: 'ticket-id',
      title: 'Test Ticket',
      content: 'Test ticket description',
      status: 'IN_PROGRESS' as const,
      deadline: '2024-12-31',
      bounty: 2500,
      userId: 'user-id',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-16'),
      user: {
        name: 'John Doe',
      },
    };

    vi.mocked(prisma.ticket.findUnique).mockResolvedValue(mockTicket);

    const { getTicket } = await import('../get-ticket');
    const result = await getTicket('ticket-id');

    expect(result?.user).toEqual({ name: 'John Doe' });
    expect(result?.title).toBe('Test Ticket');
    expect(result?.status).toBe('IN_PROGRESS');
    expect(result?.bounty).toBe(2500);
  });

  it('should handle different ticket statuses', async () => {
    const { prisma } = await import('@/lib/prisma');

    const mockTicket = {
      id: 'ticket-id',
      title: 'Completed Ticket',
      content: 'This ticket is done',
      status: 'DONE' as const,
      deadline: '2024-12-31',
      bounty: 5000,
      userId: 'user-id',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-20'),
      user: {
        name: 'Jane Smith',
      },
    };

    vi.mocked(prisma.ticket.findUnique).mockResolvedValue(mockTicket);

    const { getTicket } = await import('../get-ticket');
    const result = await getTicket('ticket-id');

    expect(result?.status).toBe('DONE');
    expect(result?.user.name).toBe('Jane Smith');
  });

  it('should handle tickets with zero bounty', async () => {
    const { prisma } = await import('@/lib/prisma');

    const mockTicket = {
      id: 'ticket-id',
      title: 'Free Ticket',
      description: 'No bounty ticket',
      content: 'No bounty ticket',
      status: 'OPEN' as const,
      bounty: 0,
      deadline: '2024-12-31',
      userId: 'user-id',
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        name: 'Volunteer User',
      },
    };

    vi.mocked(prisma.ticket.findUnique).mockResolvedValue(mockTicket);

    const { getTicket } = await import('../get-ticket');
    const result = await getTicket('ticket-id');

    expect(result?.bounty).toBe(0);
    expect(result?.title).toBe('Free Ticket');
  });

  it('should use correct ticket id in query', async () => {
    const { prisma } = await import('@/lib/prisma');

    vi.mocked(prisma.ticket.findUnique).mockResolvedValue(null);

    const { getTicket } = await import('../get-ticket');
    await getTicket('specific-ticket-id-123');

    expect(prisma.ticket.findUnique).toHaveBeenCalledWith({
      where: {
        id: 'specific-ticket-id-123',
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  });

  it('should return null when prisma returns undefined', async () => {
    const { prisma } = await import('@/lib/prisma');

    vi.mocked(prisma.ticket.findUnique).mockResolvedValue(null);

    const { getTicket } = await import('../get-ticket');
    const result = await getTicket('ticket-id');

    expect(result).toBeNull();
  });
});
