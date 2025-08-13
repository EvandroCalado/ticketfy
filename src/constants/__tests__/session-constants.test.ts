import { describe, expect, it } from 'vitest';

import { SESSION_COOKIE_NAME } from '../session-cookie-name';
import { SESSION_MAX_DURATION_MS } from '../session-max-duration-ms';
import { SESSION_REFRESH_INTERVAL_MS } from '../session-refresh-interval-ms';

describe('session constants', () => {
  describe('SESSION_COOKIE_NAME', () => {
    it('should be a string', () => {
      expect(typeof SESSION_COOKIE_NAME).toBe('string');
    });

    it('should have the correct value', () => {
      expect(SESSION_COOKIE_NAME).toBe('session');
    });

    it('should not be empty', () => {
      expect(SESSION_COOKIE_NAME.length).toBeGreaterThan(0);
    });
  });

  describe('SESSION_REFRESH_INTERVAL_MS', () => {
    it('should be a number', () => {
      expect(typeof SESSION_REFRESH_INTERVAL_MS).toBe('number');
    });

    it('should represent 15 days in milliseconds', () => {
      const expectedMs = 1000 * 60 * 60 * 24 * 15; // 15 days
      expect(SESSION_REFRESH_INTERVAL_MS).toBe(expectedMs);
    });

    it('should be 1296000000 milliseconds', () => {
      expect(SESSION_REFRESH_INTERVAL_MS).toBe(1296000000);
    });

    it('should be a positive number', () => {
      expect(SESSION_REFRESH_INTERVAL_MS).toBeGreaterThan(0);
    });

    it('should convert back to 15 days correctly', () => {
      const days = SESSION_REFRESH_INTERVAL_MS / (1000 * 60 * 60 * 24);
      expect(days).toBe(15);
    });
  });

  describe('SESSION_MAX_DURATION_MS', () => {
    it('should be a number', () => {
      expect(typeof SESSION_MAX_DURATION_MS).toBe('number');
    });

    it('should be twice the refresh interval', () => {
      expect(SESSION_MAX_DURATION_MS).toBe(SESSION_REFRESH_INTERVAL_MS * 2);
    });

    it('should represent 30 days in milliseconds', () => {
      const expectedMs = 1000 * 60 * 60 * 24 * 30; // 30 days
      expect(SESSION_MAX_DURATION_MS).toBe(expectedMs);
    });

    it('should be 2592000000 milliseconds', () => {
      expect(SESSION_MAX_DURATION_MS).toBe(2592000000);
    });

    it('should be greater than refresh interval', () => {
      expect(SESSION_MAX_DURATION_MS).toBeGreaterThan(
        SESSION_REFRESH_INTERVAL_MS,
      );
    });

    it('should convert back to 30 days correctly', () => {
      const days = SESSION_MAX_DURATION_MS / (1000 * 60 * 60 * 24);
      expect(days).toBe(30);
    });
  });
});
