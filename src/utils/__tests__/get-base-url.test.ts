import { describe, expect, it, vi } from 'vitest';

import { getBaseUrl } from '../get-base-url';

describe('get-base-url', () => {
  it('should return localhost URL in development', () => {
    vi.stubEnv('NODE_ENV', 'development');

    const url = getBaseUrl();
    expect(url).toBe('http://localhost:3000');
  });

  it('should return production URL in production', () => {
    vi.stubEnv('NODE_ENV', 'production');

    const url = getBaseUrl();
    expect(url).toBe('https://ticketfy.vercel.app');
  });

  it('should return production URL for test environment', () => {
    vi.stubEnv('NODE_ENV', 'test');

    const url = getBaseUrl();
    expect(url).toBe('https://ticketfy.vercel.app');
  });

  it('should return production URL for undefined NODE_ENV', () => {
    vi.stubEnv('NODE_ENV', undefined);

    const url = getBaseUrl();
    expect(url).toBe('https://ticketfy.vercel.app');
  });
});
