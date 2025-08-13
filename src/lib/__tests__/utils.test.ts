import { describe, expect, it } from 'vitest';

import { cn } from '../utils';

describe('utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('px-4', 'py-2', 'bg-blue-500');
      expect(result).toBe('px-4 py-2 bg-blue-500');
    });

    it('should handle conditional classes', () => {
      const result = cn('px-4', true && 'py-2', false && 'bg-red-500');
      expect(result).toBe('px-4 py-2');
    });

    it('should merge conflicting Tailwind classes', () => {
      const result = cn('px-4 px-6', 'py-2 py-4');
      expect(result).toBe('px-6 py-4');
    });

    it('should handle objects with conditional classes', () => {
      const result = cn({
        'px-4': true,
        'py-2': true,
        'bg-red-500': false,
        'bg-blue-500': true,
      });
      expect(result).toBe('px-4 py-2 bg-blue-500');
    });

    it('should handle arrays of classes', () => {
      const result = cn(['px-4', 'py-2'], ['bg-blue-500', 'text-white']);
      expect(result).toBe('px-4 py-2 bg-blue-500 text-white');
    });

    it('should handle empty inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle null and undefined inputs', () => {
      const result = cn('px-4', null, undefined, 'py-2');
      expect(result).toBe('px-4 py-2');
    });

    it('should handle complex Tailwind merge scenarios', () => {
      const result = cn('bg-red-500 bg-blue-500', 'text-sm text-lg');
      expect(result).toBe('bg-blue-500 text-lg');
    });

    it('should preserve non-conflicting classes', () => {
      const result = cn('px-4 py-2', 'bg-blue-500 text-white', 'rounded-md');
      expect(result).toBe('px-4 py-2 bg-blue-500 text-white rounded-md');
    });
  });
});
