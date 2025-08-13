import { describe, expect, it } from 'vitest';

import { PASSWORD_RESET_TOKEN_LIFETIME_MS } from '../password-reset-token-lifetime-ms';

describe('PASSWORD_RESET_TOKEN_LIFETIME_MS', () => {
  it('should be exactly 2 hours in milliseconds', () => {
    const expectedMs = 2 * 60 * 60 * 1000; // 2 hours
    expect(PASSWORD_RESET_TOKEN_LIFETIME_MS).toBe(expectedMs);
  });

  it('should be 7200000 milliseconds', () => {
    expect(PASSWORD_RESET_TOKEN_LIFETIME_MS).toBe(7200000);
  });

  it('should be a positive number', () => {
    expect(PASSWORD_RESET_TOKEN_LIFETIME_MS).toBeGreaterThan(0);
  });

  it('should represent exactly 2 hours when converted back', () => {
    const hours = PASSWORD_RESET_TOKEN_LIFETIME_MS / (60 * 60 * 1000);
    expect(hours).toBe(2);
  });

  it('should represent exactly 120 minutes when converted back', () => {
    const minutes = PASSWORD_RESET_TOKEN_LIFETIME_MS / (60 * 1000);
    expect(minutes).toBe(120);
  });
});
