import { describe, expect, it } from 'vitest';

import { signUpSchema } from '../sign-up';

describe('signUpSchema', () => {
  it('should validate correct data', () => {
    const validData = {
      name: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    const result = signUpSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject name with spaces', () => {
    const invalidData = {
      name: 'john doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Usuário não pode ter espaços',
      );
    }
  });

  it('should reject short name', () => {
    const invalidData = {
      name: 'jo',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Nome deve ter pelo menos 3 caracteres',
      );
    }
  });

  it('should reject invalid email', () => {
    const invalidData = {
      name: 'johndoe',
      email: 'invalid-email',
      password: 'password123',
      confirmPassword: 'password123',
    };

    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Email inválido');
    }
  });

  it('should reject short password', () => {
    const invalidData = {
      name: 'johndoe',
      email: 'john@example.com',
      password: '123',
      confirmPassword: '123',
    };

    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Senha deve ter pelo menos 6 caracteres',
      );
    }
  });

  it('should reject mismatched passwords', () => {
    const invalidData = {
      name: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'different123',
    };

    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('As senhas não coincidem');
      expect(result.error.issues[0].path).toEqual(['confirmPassword']);
    }
  });
});
