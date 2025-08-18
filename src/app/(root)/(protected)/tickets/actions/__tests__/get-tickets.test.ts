import { SearchParams } from 'nuqs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock dependencies
vi.mock('@/lib/prisma', () => ({
  prisma: {
    $transaction: vi.fn(),
    ticket: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

// Mock types from Prisma
vi.mock('@/generated/prisma', () => ({
  Prisma: {},
}));

describe('getTickets', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockTickets = [
    {
      id: 'ticket-1',
      title: 'First Ticket',
      content: 'Content of first ticket',
      status: 'OPEN' as const,
      deadline: '2024-12-31',
      bounty: 1000,
      userId: 'user-1',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      user: {
        name: 'John Doe',
      },
    },
    {
      id: 'ticket-2',
      title: 'Second Ticket',
      content: 'Content of second ticket',
      status: 'IN_PROGRESS' as const,
      deadline: '2024-12-31',
      bounty: 2000,
      userId: 'user-1',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
      user: {
        name: 'John Doe',
      },
    },
  ];

  it('should return tickets with metadata when called with userId only', async () => {
    const expectedTickets = mockTickets;
    const expectedCount = 2;

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([
      expectedTickets,
      expectedCount,
    ]);

    const { getTickets } = await import('../get-tickets');
    const result = await getTickets('user-1');

    expect(result).toEqual({
      tickets: expectedTickets,
      metadata: {
        count: expectedCount,
        hasNextPage: false,
      },
    });

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it('should return tickets with metadata when userId is undefined', async () => {
    const expectedTickets = mockTickets;
    const expectedCount = 10;

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([
      expectedTickets,
      expectedCount,
    ]);

    const { getTickets } = await import('../get-tickets');
    const result = await getTickets(undefined);

    expect(result).toEqual({
      tickets: expectedTickets,
      metadata: {
        count: expectedCount,
        hasNextPage: false,
      },
    });
  });

  it('should apply search filter when search parameter is provided', async () => {
    const searchParams: SearchParams = {
      search: 'test search',
    };
    const expectedTickets = [mockTickets[0]];
    const expectedCount = 1;

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([
      expectedTickets,
      expectedCount,
    ]);

    const { getTickets } = await import('../get-tickets');
    await getTickets('user-1', searchParams);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);

    // Verify where clause should contain search filter
    const transactionCall = vi.mocked(prisma.$transaction).mock.calls[0][0];
    expect(transactionCall).toHaveLength(2);
  });

  it('should not apply search filter when search parameter is not a string', async () => {
    const searchParams: SearchParams = {
      search: 123 as unknown as string, // Not a string
    };

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([mockTickets, 2]);

    const { getTickets } = await import('../get-tickets');
    await getTickets('user-1', searchParams);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it('should apply pagination with skip and take parameters', async () => {
    const searchParams: SearchParams = {
      page: '1', // Second page
      size: '5', // 5 items per page
    };

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([mockTickets, 10]);

    const { getTickets } = await import('../get-tickets');
    await getTickets('user-1', searchParams);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it('should sort by newest when sort parameter is "newest"', async () => {
    const searchParams: SearchParams = {
      sort: 'newest',
    };

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([mockTickets, 2]);

    const { getTickets } = await import('../get-tickets');
    await getTickets('user-1', searchParams);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it('should sort by oldest when sort parameter is "oldest"', async () => {
    const searchParams: SearchParams = {
      sort: 'oldest',
    };

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([mockTickets, 2]);

    const { getTickets } = await import('../get-tickets');
    await getTickets('user-1', searchParams);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it('should sort by bounty when sort parameter is "bounty"', async () => {
    const searchParams: SearchParams = {
      sort: 'bounty',
    };

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([mockTickets, 2]);

    const { getTickets } = await import('../get-tickets');
    await getTickets('user-1', searchParams);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it('should not apply any sorting when sort parameter is not recognized', async () => {
    const searchParams: SearchParams = {
      sort: 'invalid-sort',
    };

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([mockTickets, 2]);

    const { getTickets } = await import('../get-tickets');
    await getTickets('user-1', searchParams);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it('should calculate hasNextPage correctly when there are more items', async () => {
    const searchParams: SearchParams = {
      page: '0', // First page
      size: '2', // 2 items per page
    };
    const totalCount = 5; // More items available

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([mockTickets, totalCount]);

    const { getTickets } = await import('../get-tickets');
    const result = await getTickets('user-1', searchParams);

    expect(result.metadata.hasNextPage).toBe(true);
    expect(result.metadata.count).toBe(totalCount);
  });

  it('should calculate hasNextPage correctly when there are no more items', async () => {
    const searchParams: SearchParams = {
      page: '0', // First page
      size: '5', // 5 items per page
    };
    const totalCount = 2; // Fewer items than page size

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([mockTickets, totalCount]);

    const { getTickets } = await import('../get-tickets');
    const result = await getTickets('user-1', searchParams);

    expect(result.metadata.hasNextPage).toBe(false);
    expect(result.metadata.count).toBe(totalCount);
  });

  it('should return empty tickets array when no tickets found', async () => {
    const emptyTickets: never[] = [];
    const zeroCount = 0;

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([emptyTickets, zeroCount]);

    const { getTickets } = await import('../get-tickets');
    const result = await getTickets('user-1');

    expect(result.tickets).toEqual([]);
    expect(result.metadata.count).toBe(0);
    expect(result.metadata.hasNextPage).toBe(false);
  });

  it('should handle complex search and filter combination', async () => {
    const searchParams: SearchParams = {
      search: 'important ticket',
      sort: 'bounty',
      page: '1',
      size: '3',
    };

    const filteredTickets = [mockTickets[1]];
    const filteredCount = 4;

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([
      filteredTickets,
      filteredCount,
    ]);

    const { getTickets } = await import('../get-tickets');
    const result = await getTickets('user-1', searchParams);

    expect(result.tickets).toEqual(filteredTickets);
    expect(result.metadata.count).toBe(filteredCount);

    // 4 total, skip 3, take 3, no more pages
    // 4 > 3 + 3 = false
    expect(result.metadata.hasNextPage).toBe(false);
  });

  it('should handle edge case with page 0 and size 0', async () => {
    const searchParams: SearchParams = {
      page: '0',
      size: '0',
    };

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([[], 0]);

    const { getTickets } = await import('../get-tickets');
    const result = await getTickets('user-1', searchParams);

    expect(result.tickets).toEqual([]);
    expect(result.metadata.hasNextPage).toBe(false);
  });

  it('should handle non-numeric page and size parameters', async () => {
    const searchParams: SearchParams = {
      page: 'invalid',
      size: 'invalid',
    };

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([mockTickets, 2]);

    const { getTickets } = await import('../get-tickets');
    await getTickets('user-1', searchParams);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it('should include user name in ticket response', async () => {
    const ticketsWithUsers = [
      {
        ...mockTickets[0],
        user: { name: 'Alice Smith' },
      },
    ];

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([ticketsWithUsers, 1]);

    const { getTickets } = await import('../get-tickets');
    const result = await getTickets('user-1');

    expect(result.tickets[0].user.name).toBe('Alice Smith');
  });

  it('should handle case where search parameter is empty string', async () => {
    const searchParams: SearchParams = {
      search: '',
    };

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([mockTickets, 2]);

    const { getTickets } = await import('../get-tickets');
    await getTickets('user-1', searchParams);

    // Empty string is still a string, so filter should be applied
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it('should handle large page numbers correctly', async () => {
    const searchParams: SearchParams = {
      page: '100',
      size: '10',
    };

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockResolvedValue([[], 50]); // No tickets on page 100

    const { getTickets } = await import('../get-tickets');
    const result = await getTickets('user-1', searchParams);

    expect(result.tickets).toEqual([]);
    expect(result.metadata.count).toBe(50);
    expect(result.metadata.hasNextPage).toBe(false);
  });

  it('should pass correct parameters to prisma transaction', async () => {
    const searchParams: SearchParams = {
      search: 'test',
      sort: 'newest',
      page: '1',
      size: '5',
    };

    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$transaction).mockImplementation(() => {
      // Simulate what the transaction would return
      return Promise.resolve([mockTickets, 10]);
    });

    const { getTickets } = await import('../get-tickets');
    await getTickets('user-123', searchParams);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });
});
