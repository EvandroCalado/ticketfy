import { describe, expect, it } from 'vitest';

import { forgotPasswordSchema } from '../forgot-password';

describe('forgotPasswordSchema', () => {
  it('should validate correct email', () => {
    const validData = {
      email: 'user@example.com',
    };

    const result = forgotPasswordSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email format', () => {
    const invalidData = {
      email: 'invalid-email',
    };

    const result = forgotPasswordSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Email inválido');
    }
  });

  it('should reject missing email', () => {
    const invalidData = {};

    const result = forgotPasswordSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject empty email', () => {
    const invalidData = {
      email: '',
    };

    const result = forgotPasswordSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept various valid email formats', () => {
    const validEmails = [
      'user@example.com',
      'test.email@domain.co.uk',
      'user+tag@example.org',
      'user123@test-domain.com',
    ];

    validEmails.forEach(email => {
      const result = forgotPasswordSchema.safeParse({ email });
      expect(result.success).toBe(true);
    });
  });
});
