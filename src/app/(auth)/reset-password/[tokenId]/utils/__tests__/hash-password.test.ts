import { hash } from '@node-rs/argon2';
import { describe, expect, it, vi } from 'vitest';

import { hashPassword } from '../hash-password';

// Mock the argon2 module
vi.mock('@node-rs/argon2', () => ({
  hash: vi.fn(),
}));

const mockHash = vi.mocked(hash);

describe('hashPassword', () => {
  it('should call hash with correct parameters', async () => {
    const password = 'testpassword123';
    const expectedHash = 'hashed_password_result';

    mockHash.mockResolvedValue(expectedHash);

    const result = await hashPassword(password);

    expect(mockHash).toHaveBeenCalledWith(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    expect(result).toBe(expectedHash);
  });

  it('should handle empty password', async () => {
    const password = '';
    const expectedHash = 'empty_password_hash';

    mockHash.mockResolvedValue(expectedHash);

    const result = await hashPassword(password);

    expect(mockHash).toHaveBeenCalledWith(password, expect.any(Object));
    expect(result).toBe(expectedHash);
  });

  it('should use consistent argon2 configuration', async () => {
    const password = 'testpassword';
    mockHash.mockResolvedValue('hash_result');

    await hashPassword(password);

    const [, config] = mockHash.mock.calls[0];
    expect(config).toEqual({
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
  });

  it('should handle long passwords', async () => {
    const longPassword = 'a'.repeat(1000);
    const expectedHash = 'long_password_hash';

    mockHash.mockResolvedValue(expectedHash);

    const result = await hashPassword(longPassword);

    expect(mockHash).toHaveBeenCalledWith(longPassword, expect.any(Object));
    expect(result).toBe(expectedHash);
  });
});
