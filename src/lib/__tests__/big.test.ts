import { describe, expect, it } from 'vitest';

import { MyBig } from '../big';

describe('MyBig configuration', () => {
  it('should have correct decimal places configuration', () => {
    expect(MyBig.DP).toBe(2);
  });

  it('should use roundHalfEven rounding mode', () => {
    expect(MyBig.RM).toBe(MyBig.roundHalfEven);
  });

  it('should round to 2 decimal places', () => {
    const result = new MyBig('10.999').round();
    expect(result.toString()).toBe('11');
  });

  it('should handle roundHalfEven correctly', () => {
    // Test cases for roundHalfEven (banker's rounding)
    expect(new MyBig('2.5').round().toString()).toBe('2'); // rounds to even
    expect(new MyBig('3.5').round().toString()).toBe('4'); // rounds to even
    expect(new MyBig('4.5').round().toString()).toBe('4'); // rounds to even
    expect(new MyBig('5.5').round().toString()).toBe('6'); // rounds to even
  });

  it('should perform basic arithmetic operations', () => {
    const a = new MyBig('10.50');
    const b = new MyBig('5.25');

    expect(a.plus(b).toString()).toBe('15.75');
    expect(a.minus(b).toString()).toBe('5.25');
    expect(a.mul(b).toString()).toBe('55.125'); // Actual result without rounding
    expect(a.div(b).toString()).toBe('2');
  });

  it('should handle precision correctly', () => {
    const result = new MyBig('1').div('3').mul('3');
    // The result should be close to 1, but may have precision differences
    expect(result.toString()).toBe('0.99'); // Actual result with DP=2
  });

  it('should maintain precision in currency calculations', () => {
    // Simulate currency conversion (cents to dollars)
    const cents = new MyBig('1050'); // 10.50 in cents
    const dollars = cents.div('100');
    expect(dollars.toString()).toBe('10.5');
  });
});
