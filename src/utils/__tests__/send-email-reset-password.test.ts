import { describe, expect, it, vi } from 'vitest';

// Mock dependencies first
vi.mock('@/lib/resend', () => ({
  resend: {
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'test-email-id' }),
    },
  },
}));

vi.mock('@/components/email/email-password-reset', () => ({
  default: () => 'MockedEmailComponent',
}));

describe('send-email-reset-password', () => {
  it('should export sendEmailResetPassword function', async () => {
    const { sendEmailResetPassword } = await import(
      '../send-email-reset-password'
    );
    expect(typeof sendEmailResetPassword).toBe('function');
  });

  it('should call resend.emails.send when invoked', async () => {
    const { sendEmailResetPassword } = await import(
      '../send-email-reset-password'
    );
    const { resend } = await import('@/lib/resend');

    await sendEmailResetPassword(
      'Test User',
      'test@example.com',
      'https://example.com/reset',
    );

    expect(resend.emails.send).toHaveBeenCalled();
  });
});
