import { describe, expect, it } from 'vitest';

import { changePasswordSchema } from '../change-password';

describe('changePasswordSchema', () => {
  it('should validate correct password', () => {
    const validData = {
      password: 'newpassword123',
    };

    const result = changePasswordSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject short password', () => {
    const invalidData = {
      password: '123',
    };

    const result = changePasswordSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Senha deve ter pelo menos 6 caracteres',
      );
    }
  });

  it('should reject missing password', () => {
    const invalidData = {};

    const result = changePasswordSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject empty password', () => {
    const invalidData = {
      password: '',
    };

    const result = changePasswordSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept minimum valid password length', () => {
    const validData = {
      password: '123456', // exactly 6 characters
    };

    const result = changePasswordSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should accept long passwords', () => {
    const validData = {
      password: 'a'.repeat(100), // very long password
    };

    const result = changePasswordSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
