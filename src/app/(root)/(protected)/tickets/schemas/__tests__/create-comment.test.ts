import { describe, expect, it } from 'vitest';

import { createCommentSchema } from '../create-comment';

describe('createCommentSchema', () => {
  it('should validate correct comment data', () => {
    const validData = {
      content: 'Este é um comentário válido',
    };

    const result = createCommentSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject empty content', () => {
    const invalidData = {
      content: '',
    };

    const result = createCommentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Conteúdo obrigatório');
    }
  });

  it('should reject content that is too long', () => {
    const invalidData = {
      content: 'a'.repeat(1025), // 1025 characters
    };

    const result = createCommentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Máximo de 1024 caracteres');
    }
  });

  it('should accept content at maximum length', () => {
    const validData = {
      content: 'a'.repeat(1024), // exactly 1024 characters
    };

    const result = createCommentSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should accept single character content', () => {
    const validData = {
      content: 'a',
    };

    const result = createCommentSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject missing content field', () => {
    const invalidData = {};

    const result = createCommentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should handle whitespace-only content', () => {
    const invalidData = {
      content: '   ',
    };

    // This should pass validation as it's not empty string
    const result = createCommentSchema.safeParse(invalidData);
    expect(result.success).toBe(true);
  });
});
