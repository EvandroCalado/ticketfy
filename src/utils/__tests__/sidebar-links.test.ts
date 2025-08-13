import { describe, expect, it } from 'vitest';

import { sidebarLinks } from '../sidebar-links';

describe('sidebar-links', () => {
  it('should export an array of sidebar links', () => {
    expect(Array.isArray(sidebarLinks)).toBe(true);
    expect(sidebarLinks.length).toBe(3);
  });

  it('should have the first link as tickets', () => {
    const firstLink = sidebarLinks[0];
    expect(firstLink.label).toBe('Todos os tickets');
    expect(firstLink.href).toBe('/tickets');
  });

  it('should have the second link as my tickets', () => {
    const secondLink = sidebarLinks[1];
    expect(secondLink.label).toBe('Meus tickets');
    expect(secondLink.href).toBe('/tickets/my');
  });

  it('should have the third link as account', () => {
    const thirdLink = sidebarLinks[2];
    expect(thirdLink.label).toBe('Minha conta');
    expect(thirdLink.href).toBe('/account');
    expect(thirdLink.separator).toBe(true);
  });
});
