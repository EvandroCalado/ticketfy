import { describe, expect, it } from 'vitest';

import { formatDate } from '../format-date';

describe('format-date', () => {
  it('should format ISO date string', () => {
    const result = formatDate('2024-03-15T10:30:00.000Z');
    expect(result).toBe('15 de março de 2024');
  });

  it('should format simple date string', () => {
    const result = formatDate('2024-03-15');
    expect(result).toBe('15 de março de 2024');
  });

  it('should handle different months', () => {
    expect(formatDate('2024-01-01')).toBe('01 de janeiro de 2024');
    expect(formatDate('2024-12-31')).toBe('31 de dezembro de 2024');
    expect(formatDate('2024-06-15')).toBe('15 de junho de 2024');
  });

  it('should handle leap year', () => {
    expect(formatDate('2024-02-29')).toBe('29 de fevereiro de 2024');
  });

  it('should handle different years', () => {
    expect(formatDate('2023-05-10')).toBe('10 de maio de 2023');
    expect(formatDate('2025-08-20')).toBe('20 de agosto de 2025');
  });
});
