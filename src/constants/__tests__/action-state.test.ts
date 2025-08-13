import { describe, expect, it } from 'vitest';

import { ACTION_STATE } from '../action-state';

describe('action-state', () => {
  describe('ACTION_STATE constant', () => {
    it('should have correct initial structure', () => {
      expect(ACTION_STATE).toHaveProperty('success');
      expect(ACTION_STATE).toHaveProperty('message');
      expect(ACTION_STATE).toHaveProperty('fieldErrors');
      expect(ACTION_STATE).toHaveProperty('payload');
    });

    it('should have success set to false initially', () => {
      expect(ACTION_STATE.success).toBe(false);
    });

    it('should have message set to undefined initially', () => {
      expect(ACTION_STATE.message).toBeUndefined();
    });

    it('should have fieldErrors set to undefined initially', () => {
      expect(ACTION_STATE.fieldErrors).toBeUndefined();
    });

    it('should have payload set to undefined initially', () => {
      expect(ACTION_STATE.payload).toBeUndefined();
    });

    it('should be an object', () => {
      expect(typeof ACTION_STATE).toBe('object');
      expect(ACTION_STATE).not.toBeNull();
    });

    it('should have exactly 4 properties', () => {
      const keys = Object.keys(ACTION_STATE);
      expect(keys).toHaveLength(4);
    });

    it('should have the correct property names', () => {
      const keys = Object.keys(ACTION_STATE);
      expect(keys).toContain('success');
      expect(keys).toContain('message');
      expect(keys).toContain('fieldErrors');
      expect(keys).toContain('payload');
    });
  });
});
