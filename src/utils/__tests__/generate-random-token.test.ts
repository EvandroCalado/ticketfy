import { beforeEach, describe, expect, it, vi } from 'vitest';

import { generateRandomToken } from '../generate-random-token';

// Mock crypto before importing
const mockGetRandomValues = vi.fn();
vi.stubGlobal('crypto', {
  getRandomValues: mockGetRandomValues,
});

describe('generateRandomToken', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate a string token with mocked crypto', () => {
    mockGetRandomValues.mockImplementation((array: Uint8Array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = i;
      }
      return array;
    });

    const token = generateRandomToken();
    expect(typeof token).toBe('string');
    expect(token.length).toBe(32);
    expect(mockGetRandomValues).toHaveBeenCalledWith(expect.any(Uint8Array));
  });

  it('should call crypto.getRandomValues with 20-byte Uint8Array', () => {
    mockGetRandomValues.mockImplementation((array: Uint8Array) => {
      array.fill(42);
      return array;
    });

    generateRandomToken();

    expect(mockGetRandomValues).toHaveBeenCalledTimes(1);
    const calledWith = mockGetRandomValues.mock.calls[0][0];
    expect(calledWith).toBeInstanceOf(Uint8Array);
    expect(calledWith.length).toBe(20);
  });

  it('should generate different tokens on multiple calls', () => {
    let counter = 0;
    mockGetRandomValues.mockImplementation((array: Uint8Array) => {
      counter++;
      for (let i = 0; i < array.length; i++) {
        array[i] = (counter * 37 + i) % 256;
      }
      return array;
    });

    const token1 = generateRandomToken();
    const token2 = generateRandomToken();
    expect(token1).not.toBe(token2);
  });

  it('should generate valid base32 tokens', () => {
    mockGetRandomValues.mockImplementation((array: Uint8Array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = (i * 13 + 7) % 256;
      }
      return array;
    });

    const token = generateRandomToken();
    expect(token).toMatch(/^[a-z2-7]+$/);
    expect(token).not.toMatch(/[A-Z0189+=]/);
  });

  it('should handle all zero bytes', () => {
    mockGetRandomValues.mockImplementation((array: Uint8Array) => {
      array.fill(0);
      return array;
    });

    const token = generateRandomToken();
    expect(token).toBe('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  });

  it('should handle all max bytes (255)', () => {
    mockGetRandomValues.mockImplementation((array: Uint8Array) => {
      array.fill(255);
      return array;
    });

    const token = generateRandomToken();
    expect(token).toBe('77777777777777777777777777777777');
  });

  it('should produce consistent output for same input', () => {
    const testBytes = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];

    mockGetRandomValues.mockImplementation((array: Uint8Array) => {
      testBytes.forEach((byte, index) => {
        array[index] = byte;
      });
      return array;
    });

    const token1 = generateRandomToken();
    const token2 = generateRandomToken();
    expect(token1).toBe(token2);
  });

  it('should handle crypto.getRandomValues errors', () => {
    mockGetRandomValues.mockImplementation(() => {
      throw new Error('Crypto not available');
    });

    expect(() => generateRandomToken()).toThrow('Crypto not available');
  });

  it('should execute all lines of the function', () => {
    // This test ensures every line is executed
    mockGetRandomValues.mockImplementation((array: Uint8Array) => {
      // Verify we get the correct array (line: const bytes = new Uint8Array(20))
      expect(array).toBeInstanceOf(Uint8Array);
      expect(array.length).toBe(20);

      // Fill array (line: crypto.getRandomValues(bytes))
      for (let i = 0; i < array.length; i++) {
        array[i] = (i * 3 + 1) % 256;
      }
      return array;
    });

    // This call executes:
    // - export const generateRandomToken = () => {
    // - const bytes = new Uint8Array(20);
    // - crypto.getRandomValues(bytes);
    // - return encodeBase32LowerCaseNoPadding(bytes);
    const result = generateRandomToken();

    expect(typeof result).toBe('string');
    expect(result.length).toBe(32);
    expect(mockGetRandomValues).toHaveBeenCalledTimes(1);
  });
});
