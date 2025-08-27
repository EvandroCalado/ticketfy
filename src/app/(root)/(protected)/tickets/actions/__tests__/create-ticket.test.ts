import { describe, expect, it, vi } from 'vitest';

// Mock dependencies
vi.mock('@/actions/get-auth', () => ({
  getAuth: vi.fn().mockResolvedValue({
    user: { id: 'user-id', emailVerified: true },
  }),
}));

// Mock getOrganizationByUser
vi.mock(
  '@/app/(root)/(protected)/organizations/actions/get-organization-by-user',
  () => ({
    getOrganizationByUser: vi.fn().mockResolvedValue([
      {
        id: 'org-123',
        name: 'Test Organization',
        membershipByUser: {
          id: 'membership-123',
          userId: 'user-id',
          organizationId: 'org-123',
          isActive: true,
          role: 'ADMIN',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ]),
  }),
);

vi.mock('@/lib/prisma', () => ({
  prisma: {
    ticket: {
      create: vi.fn().mockResolvedValue({
        id: 'ticket-id',
        title: 'Test Ticket',
      }),
    },
  },
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('create-ticket action', () => {
  it('should export createTicket function', async () => {
    const { createTicket } = await import('../create-ticket');
    expect(typeof createTicket).toBe('function');
  });

  it('should create ticket when called with valid data', async () => {
    const { createTicket } = await import('../create-ticket');
    const { prisma } = await import('@/lib/prisma');

    const formData = new FormData();
    formData.set('title', 'Test Ticket');
    formData.set('content', 'This is a test ticket content');
    formData.set('deadline', '2024-12-31');
    formData.set('bounty', '100');

    await createTicket(null, formData);

    expect(prisma.ticket.create).toHaveBeenCalled();
  });
});
