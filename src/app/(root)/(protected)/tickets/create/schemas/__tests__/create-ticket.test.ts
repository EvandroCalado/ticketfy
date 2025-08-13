import { describe, expect, it } from 'vitest';

import { createTicketSchema } from '../create-ticket';

describe('createTicketSchema', () => {
  it('should validate correct ticket data', () => {
    const validData = {
      title: 'Bug no sistema',
      content: 'Descrição detalhada do problema encontrado no sistema',
      deadline: '2024-12-31',
      bounty: '100.50',
    };

    const result = createTicketSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject short title', () => {
    const invalidData = {
      title: 'Bu',
      content: 'Descrição detalhada do problema',
      deadline: '2024-12-31',
      bounty: '100.50',
    };

    const result = createTicketSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Título deve ter pelo menos 3 caracteres',
      );
    }
  });

  it('should reject short content', () => {
    const invalidData = {
      title: 'Bug no sistema',
      content: 'Curto',
      deadline: '2024-12-31',
      bounty: '100.50',
    };

    const result = createTicketSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Conteúdo deve ter pelo menos 10 caracteres',
      );
    }
  });

  it('should reject long content', () => {
    const invalidData = {
      title: 'Bug no sistema',
      content: 'a'.repeat(1025), // 1025 characters
      deadline: '2024-12-31',
      bounty: '100.50',
    };

    const result = createTicketSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Conteúdo deve ter no máximo 1024 caracteres',
      );
    }
  });

  it('should reject invalid date format', () => {
    const invalidData = {
      title: 'Bug no sistema',
      content: 'Descrição detalhada do problema',
      deadline: '31/12/2024',
      bounty: '100.50',
    };

    const result = createTicketSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Data inválida');
    }
  });

  it('should reject zero or negative bounty', () => {
    const invalidData = {
      title: 'Bug no sistema',
      content: 'Descrição detalhada do problema',
      deadline: '2024-12-31',
      bounty: '0',
    };

    const result = createTicketSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Bônus deve ser maior que 0');
    }
  });

  it('should accept valid date formats', () => {
    const validData = {
      title: 'Bug no sistema',
      content: 'Descrição detalhada do problema',
      deadline: '2024-01-01',
      bounty: '50',
    };

    const result = createTicketSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
