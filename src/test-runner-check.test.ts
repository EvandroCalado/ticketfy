import { describe, expect, it } from 'vitest';

describe('test runner check', () => {
  it('should run basic tests', () => {
    expect(true).toBe(true);
    expect(1 + 1).toBe(2);
    expect('hello').toBe('hello');
  });

  it('should handle arrays', () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr[0]).toBe(1);
  });

  it('should handle objects', () => {
    const obj = { name: 'test', value: 42 };
    expect(obj).toHaveProperty('name');
    expect(obj.name).toBe('test');
  });
});
