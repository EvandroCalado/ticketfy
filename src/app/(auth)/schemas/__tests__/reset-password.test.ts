import { describe, expect, it } from 'vitest';

import { resetPasswordSchema } from '../reset-password';

describe('resetPasswordSchema', () => {
  it('should validate valid password data', () => {
    const validData = {
      password: '123456',
      confirmPassword: '123456',
    };

    const result = resetPasswordSchema.safeParse(validData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('should reject password shorter than 6 characters', () => {
    const invalidData = {
      password: '12345',
      confirmPassword: '12345',
    };

    const result = resetPasswordSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Senha deve ter pelo menos 6 caracteres',
      );
      expect(result.error.issues[0].path).toEqual(['password']);
    }
  });

  it('should reject when passwords do not match', () => {
    const invalidData = {
      password: '123456',
      confirmPassword: '654321',
    };

    const result = resetPasswordSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('As senhas não coincidem');
      expect(result.error.issues[0].path).toEqual(['confirmPassword']);
    }
  });

  it('should reject missing password field', () => {
    const invalidData = {
      confirmPassword: '123456',
    };

    const result = resetPasswordSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].code).toBe('invalid_type');
      expect(result.error.issues[0].path).toEqual(['password']);
    }
  });

  it('should reject missing confirmPassword field', () => {
    const invalidData = {
      password: '123456',
    };

    const result = resetPasswordSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].code).toBe('invalid_type');
      expect(result.error.issues[0].path).toEqual(['confirmPassword']);
    }
  });

  it('should reject empty password', () => {
    const invalidData = {
      password: '',
      confirmPassword: '',
    };

    const result = resetPasswordSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Senha deve ter pelo menos 6 caracteres',
      );
      expect(result.error.issues[0].path).toEqual(['password']);
    }
  });

  it('should accept longer passwords', () => {
    const validData = {
      password: 'senhamuitorande123456',
      confirmPassword: 'senhamuitorande123456',
    };

    const result = resetPasswordSchema.safeParse(validData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('should reject non-string password', () => {
    const invalidData = {
      password: 123456,
      confirmPassword: '123456',
    };

    const result = resetPasswordSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].code).toBe('invalid_type');
      expect(result.error.issues[0].path).toEqual(['password']);
    }
  });

  it('should reject non-string confirmPassword', () => {
    const invalidData = {
      password: '123456',
      confirmPassword: 123456,
    };

    const result = resetPasswordSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].code).toBe('invalid_type');
      expect(result.error.issues[0].path).toEqual(['confirmPassword']);
    }
  });
});
