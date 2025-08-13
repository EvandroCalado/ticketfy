import { describe, expect, it } from 'vitest';

import { formatCurrency, fromCent, toCent } from '../format-currency';

describe('format-currency', () => {
  describe('toCent', () => {
    it('should convert decimal to cents', () => {
      expect(toCent('10.50')).toBe('1050');
      expect(toCent('0.01')).toBe('1');
      expect(toCent('100')).toBe('10000');
      expect(toCent('0')).toBe('0');
    });

    it('should handle string numbers with many decimals', () => {
      expect(toCent('10.999')).toBe('1099.9');
      expect(toCent('10.001')).toBe('1000.1');
    });
  });

  describe('fromCent', () => {
    it('should convert cents to decimal', () => {
      expect(fromCent('1050')).toBe('10.5');
      expect(fromCent('1')).toBe('0.01');
      expect(fromCent('10000')).toBe('100');
      expect(fromCent('0')).toBe('0');
    });

    it('should handle large numbers', () => {
      expect(fromCent('999999')).toBe('9999.99');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency in Brazilian Real', () => {
      // Test the actual output format
      const result1 = formatCurrency('1050');
      const result2 = formatCurrency('10000');
      const result3 = formatCurrency('1');
      const result4 = formatCurrency('0');

      // Check that it contains the expected parts
      expect(result1).toContain('10,50');
      expect(result1).toContain('R$');
      expect(result2).toContain('100,00');
      expect(result2).toContain('R$');
      expect(result3).toContain('0,01');
      expect(result3).toContain('R$');
      expect(result4).toContain('0,00');
      expect(result4).toContain('R$');
    });

    it('should handle large amounts', () => {
      const result = formatCurrency('100000000');
      expect(result).toContain('1.000.000,00');
      expect(result).toContain('R$');
    });

    it('should return string type', () => {
      expect(typeof formatCurrency('1050')).toBe('string');
    });

    it('should handle decimal conversion correctly', () => {
      // Test the conversion logic specifically
      expect(formatCurrency('1050')).toMatch(/10[,.]50/); // Allow both comma and dot
      expect(formatCurrency('10000')).toMatch(/100[,.]00/);
    });
  });
});
