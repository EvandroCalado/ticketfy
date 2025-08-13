import { describe, expect, it } from 'vitest';

import { updateTicketSchema } from '../update-ticket';

describe('updateTicketSchema', () => {
  it('should validate correct update ticket data', () => {
    const validData = {
      title: 'Updated Bug Report',
      content: 'Updated description of the problem found in the system',
      status: 'IN_PROGRESS' as const,
      deadline: '2024-12-31',
      bounty: '150.75',
    };

    const result = updateTicketSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject short title', () => {
    const invalidData = {
      title: 'Bu',
      content: 'Valid content here',
      status: 'OPEN' as const,
      deadline: '2024-12-31',
      bounty: '100.50',
    };

    const result = updateTicketSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Título deve ter pelo menos 3 caracteres',
      );
    }
  });

  it('should reject short content', () => {
    const invalidData = {
      title: 'Valid Title',
      content: 'Short',
      status: 'OPEN' as const,
      deadline: '2024-12-31',
      bounty: '100.50',
    };

    const result = updateTicketSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Conteúdo deve ter pelo menos 10 caracteres',
      );
    }
  });

  it('should reject long content', () => {
    const invalidData = {
      title: 'Valid Title',
      content: 'a'.repeat(1025), // 1025 characters
      status: 'OPEN' as const,
      deadline: '2024-12-31',
      bounty: '100.50',
    };

    const result = updateTicketSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Conteúdo deve ter no máximo 1024 caracteres',
      );
    }
  });

  it('should reject invalid status', () => {
    const invalidData = {
      title: 'Valid Title',
      content: 'Valid content here',
      status: 'INVALID_STATUS',
      deadline: '2024-12-31',
      bounty: '100.50',
    };

    const result = updateTicketSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept all valid status values', () => {
    const validStatuses = ['OPEN', 'IN_PROGRESS', 'DONE'] as const;

    validStatuses.forEach(status => {
      const validData = {
        title: 'Valid Title',
        content: 'Valid content here',
        status,
        deadline: '2024-12-31',
        bounty: '100.50',
      };

      const result = updateTicketSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  it('should reject invalid date format', () => {
    const invalidData = {
      title: 'Valid Title',
      content: 'Valid content here',
      status: 'OPEN' as const,
      deadline: '31/12/2024',
      bounty: '100.50',
    };

    const result = updateTicketSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Data inválida');
    }
  });

  it('should reject zero or negative bounty', () => {
    const invalidData = {
      title: 'Valid Title',
      content: 'Valid content here',
      status: 'OPEN' as const,
      deadline: '2024-12-31',
      bounty: '0',
    };

    const result = updateTicketSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Bônus deve ser maior que 0');
    }
  });

  it('should accept content at maximum length', () => {
    const validData = {
      title: 'Valid Title',
      content: 'a'.repeat(1024), // exactly 1024 characters
      status: 'DONE' as const,
      deadline: '2024-01-01',
      bounty: '50',
    };

    const result = updateTicketSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
