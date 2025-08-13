import { describe, expect, it } from 'vitest';

import { navLinks } from '../nav-links';

describe('nav-links', () => {
  it('should export an array of navigation links', () => {
    expect(Array.isArray(navLinks)).toBe(true);
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('should have correct structure for each nav link', () => {
    navLinks.forEach(link => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('label');
      expect(typeof link.href).toBe('string');
      expect(typeof link.label).toBe('string');
    });
  });

  it('should contain expected navigation links', () => {
    const expectedLinks = [
      { label: 'Home', href: '/' },
      { label: 'Sobre', href: '/about' },
      { label: 'Preços', href: '/price' },
    ];

    expectedLinks.forEach(expectedLink => {
      const found = navLinks.some(
        link =>
          link.label === expectedLink.label && link.href === expectedLink.href,
      );
      expect(found).toBe(true);
    });
  });

  it('should have exactly 3 navigation links', () => {
    expect(navLinks).toHaveLength(3);
  });

  it('should have valid href paths', () => {
    navLinks.forEach(link => {
      expect(link.href).toMatch(/^\/.*$/);
    });
  });

  it('should have non-empty labels', () => {
    navLinks.forEach(link => {
      expect(link.label.trim()).not.toBe('');
    });
  });
});
