import { describe, expect, it } from 'vitest';

import { hashToken } from '../hash-token';

describe('hash-token', () => {
  it('should hash a token', () => {
    const token = 'test-token';
    const hash = hashToken(token);

    expect(typeof hash).toBe('string');
    expect(hash.length).toBeGreaterThan(0);
  });

  it('should generate consistent hashes for same input', () => {
    const token = 'test-token';
    const hash1 = hashToken(token);
    const hash2 = hashToken(token);

    expect(hash1).toBe(hash2);
  });

  it('should generate different hashes for different inputs', () => {
    const hash1 = hashToken('token1');
    const hash2 = hashToken('token2');

    expect(hash1).not.toBe(hash2);
  });

  it('should generate hex string', () => {
    const token = 'test-token';
    const hash = hashToken(token);

    // SHA256 hex should be 64 characters
    expect(hash.length).toBe(64);
    expect(hash).toMatch(/^[a-f0-9]+$/);
  });

  it('should handle empty string', () => {
    const hash = hashToken('');
    expect(typeof hash).toBe('string');
    expect(hash.length).toBe(64);
  });
});
