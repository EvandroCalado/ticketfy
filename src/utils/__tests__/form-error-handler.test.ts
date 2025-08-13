import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { formErrorHandler } from '../form-error-handler';

describe('form-error-handler', () => {
  it('should handle ZodError with field errors', () => {
    const schema = z.object({
      email: z.string().email('Email inválido'),
      password: z.string().min(6, 'Senha muito curta'),
    });

    try {
      schema.parse({ email: 'invalid', password: '123' });
    } catch (error) {
      const formData = new FormData();
      formData.set('email', 'invalid');
      formData.set('password', '123');

      const result = formErrorHandler(error, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBeUndefined();
      expect(result.fieldErrors).toBeDefined();
      expect(result.fieldErrors?.email).toContain('Email inválido');
      expect(result.fieldErrors?.password).toContain('Senha muito curta');
      expect(result.payload).toBe(formData);
    }
  });

  it('should handle generic Error', () => {
    const error = new Error('Algo deu errado');
    const formData = new FormData();

    const result = formErrorHandler(error, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Algo deu errado');
    expect(result.fieldErrors).toBeUndefined();
    expect(result.payload).toBe(formData);
  });

  it('should handle unknown error', () => {
    const error = 'string error';
    const result = formErrorHandler(error);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Algo deu errado');
    expect(result.fieldErrors).toBeUndefined();
    expect(result.payload).toBeUndefined();
  });

  it('should handle error without formData', () => {
    const error = new Error('Test error');
    const result = formErrorHandler(error);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Test error');
    expect(result.fieldErrors).toBeUndefined();
    expect(result.payload).toBeUndefined();
  });
});
