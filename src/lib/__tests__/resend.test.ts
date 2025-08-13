import { describe, expect, it, vi } from 'vitest';

// Mock Resend before any imports
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn(),
    },
  })),
}));

describe('resend module', () => {
  it('should export resend instance', async () => {
    const { resend } = await import('../resend');
    expect(resend).toBeDefined();
  });

  it('should have emails property', async () => {
    const { resend } = await import('../resend');
    expect(resend).toHaveProperty('emails');
  });

  it('should have send method', async () => {
    const { resend } = await import('../resend');
    expect(resend.emails).toHaveProperty('send');
    expect(typeof resend.emails.send).toBe('function');
  });
});
