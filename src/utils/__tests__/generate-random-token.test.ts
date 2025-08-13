import { describe, expect, it } from 'vitest';

import { generateRandomToken } from '../generate-random-token';

describe('generate-random-token', () => {
  it('should generate a token', () => {
    const token = generateRandomToken();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('should generate different tokens on multiple calls', () => {
    const token1 = generateRandomToken();
    const token2 = generateRandomToken();
    expect(token1).not.toBe(token2);
  });

  it('should generate tokens with expected length', () => {
    const token = generateRandomToken();
    // Base32 encoding of 20 bytes should be 32 characters
    expect(token.length).toBe(32);
  });

  it('should generate tokens with only valid base32 characters', () => {
    const token = generateRandomToken();
    // Base32 lowercase no padding uses: a-z, 2-7
    const validChars = /^[a-z2-7]+$/;
    expect(token).toMatch(validChars);
  });
});
