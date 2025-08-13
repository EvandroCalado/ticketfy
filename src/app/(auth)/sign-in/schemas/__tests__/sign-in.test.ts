import { describe, expect, it } from 'vitest';

import { signInSchema } from '../sign-in';

describe('signInSchema', () => {
  it('should validate correct sign in data', () => {
    const validData = {
      email: 'user@example.com',
      password: 'password123',
    };

    const result = signInSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'password123',
    };

    const result = signInSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Email inválido');
    }
  });

  it('should reject short password', () => {
    const invalidData = {
      email: 'user@example.com',
      password: '123',
    };

    const result = signInSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Senha deve ter pelo menos 6 caracteres',
      );
    }
  });

  it('should reject missing email', () => {
    const invalidData = {
      password: 'password123',
    };

    const result = signInSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject missing password', () => {
    const invalidData = {
      email: 'user@example.com',
    };

    const result = signInSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept minimum valid password length', () => {
    const validData = {
      email: 'user@example.com',
      password: '123456', // exactly 6 characters
    };

    const result = signInSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
