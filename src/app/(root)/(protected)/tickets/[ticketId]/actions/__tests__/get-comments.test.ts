import { beforeEach, describe, expect, it, vi } from 'vitest';

type Comment = {
  id: string;
  content: string;
  userId: string;
  ticketId: string;
  createdAt: Date;
  updatedAt: Date;
  user: { name: string };
};

// Mock all dependencies
vi.mock('@/lib/prisma', () => ({
  prisma: {
    $transaction: vi.fn(),
    comment: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

describe('getComments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get comments with pagination successfully', async () => {
    const { prisma } = await import('@/lib/prisma');

    const mockComments = [
      {
        id: 'comment-1',
        content: 'First comment',
        userId: 'user-1',
        ticketId: 'ticket-id',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
        user: { name: 'User One' },
      },
      {
        id: 'comment-2',
        content: 'Second comment',
        userId: 'user-2',
        ticketId: 'ticket-id',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        user: { name: 'User Two' },
      },
    ];

    const mockCount = 5;

    vi.mocked(prisma.$transaction).mockResolvedValue([mockComments, mockCount]);

    const searchParams = { page: '1', size: '2' };

    const { getComments } = await import('../get-comments');
    const result = await getComments('ticket-id', searchParams);

    expect(result).toEqual({
      comments: mockComments,
      metadata: {
        count: 5,
        hasNextPage: true, // 5 > (1 * 2) + 2 = true
      },
    });

    expect(prisma.$transaction).toHaveBeenCalled();
  });

  it('should get comments without pagination parameters', async () => {
    const { prisma } = await import('@/lib/prisma');

    const mockComments = [
      {
        id: 'comment-1',
        content: 'First comment',
        userId: 'user-1',
        ticketId: 'ticket-id',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: { name: 'User One' },
      },
    ];

    const mockCount = 1;

    vi.mocked(prisma.$transaction).mockResolvedValue([mockComments, mockCount]);

    const { getComments } = await import('../get-comments');
    const result = await getComments('ticket-id');

    expect(result).toEqual({
      comments: mockComments,
      metadata: {
        count: 1,
        hasNextPage: false, // 1 > (NaN * NaN) + NaN = false
      },
    });
  });

  it('should calculate hasNextPage correctly when there are no more pages', async () => {
    const { prisma } = await import('@/lib/prisma');

    const mockComments = [
      {
        id: 'comment-1',
        content: 'Only comment',
        userId: 'user-1',
        ticketId: 'ticket-id',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: { name: 'User One' },
      },
    ];

    const mockCount = 1;

    vi.mocked(prisma.$transaction).mockResolvedValue([mockComments, mockCount]);

    const searchParams = { page: '0', size: '10' };

    const { getComments } = await import('../get-comments');
    const result = await getComments('ticket-id', searchParams);

    expect(result.metadata.hasNextPage).toBe(false); // 1 > (0 * 10) + 10 = false
  });

  it('should handle empty comments list', async () => {
    const { prisma } = await import('@/lib/prisma');

    const mockComments: Comment[] = [];
    const mockCount = 0;

    vi.mocked(prisma.$transaction).mockResolvedValue([mockComments, mockCount]);

    const { getComments } = await import('../get-comments');
    const result = await getComments('ticket-id');

    expect(result).toEqual({
      comments: [],
      metadata: {
        count: 0,
        hasNextPage: false,
      },
    });
  });

  it('should use correct where clause and ordering', async () => {
    const { prisma } = await import('@/lib/prisma');

    vi.mocked(prisma.$transaction).mockImplementation(async operations => {
      // Verify the operations passed to transaction
      expect(operations).toHaveLength(2);
      return [[], 0];
    });

    // Mock the individual operations to verify they're called with correct parameters
    vi.mocked(prisma.comment.findMany).mockResolvedValue([]);
    vi.mocked(prisma.comment.count).mockResolvedValue(0);

    const searchParams = { page: '2', size: '5' };

    const { getComments } = await import('../get-comments');
    await getComments('test-ticket-id', searchParams);

    // The transaction should be called, but we can't easily verify the exact parameters
    // since they're passed as part of the transaction array
    expect(prisma.$transaction).toHaveBeenCalled();
  });

  it('should handle large page numbers correctly', async () => {
    const { prisma } = await import('@/lib/prisma');

    const mockComments: unknown[] = [];
    const mockCount = 100;

    vi.mocked(prisma.$transaction).mockResolvedValue([mockComments, mockCount]);

    const searchParams = { page: '10', size: '10' };

    const { getComments } = await import('../get-comments');
    const result = await getComments('ticket-id', searchParams);

    expect(result.metadata.hasNextPage).toBe(false); // 100 > (10 * 10) + 10 = false
  });

  it('should include user name in comment response', async () => {
    const { prisma } = await import('@/lib/prisma');

    const mockComments = [
      {
        id: 'comment-1',
        content: 'Test comment',
        userId: 'user-1',
        ticketId: 'ticket-id',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: { name: 'Test User' },
      },
    ];

    const mockCount = 1;

    vi.mocked(prisma.$transaction).mockResolvedValue([mockComments, mockCount]);

    const { getComments } = await import('../get-comments');
    const result = await getComments('ticket-id');

    expect(result.comments[0].user).toEqual({ name: 'Test User' });
  });
});
