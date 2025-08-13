import { describe, expect, it } from 'vitest';

import { deleteTicketSchema } from '../delete-ticket';

describe('deleteTicketSchema', () => {
  it('should validate correct ticket ID', () => {
    const validData = {
      ticketId: 'ticket-123',
    };

    const result = deleteTicketSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject missing ticket ID', () => {
    const invalidData = {};

    const result = deleteTicketSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept empty ticket ID', () => {
    const validData = {
      ticketId: '',
    };

    // Zod string() accepts empty strings by default
    const result = deleteTicketSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should accept various ticket ID formats', () => {
    const validTicketIds = [
      'ticket-123',
      'abc-def-ghi',
      '12345',
      'uuid-like-string-here',
      'simple-id',
    ];

    validTicketIds.forEach(ticketId => {
      const result = deleteTicketSchema.safeParse({ ticketId });
      expect(result.success).toBe(true);
    });
  });

  it('should accept numeric ticket IDs as strings', () => {
    const validData = {
      ticketId: '123456',
    };

    const result = deleteTicketSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
