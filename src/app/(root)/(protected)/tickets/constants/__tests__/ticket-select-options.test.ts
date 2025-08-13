import { describe, expect, it } from 'vitest';

import { ticketSelectOptions } from '../ticket-select-options';

describe('ticket-select-options', () => {
  it('should export an array of ticket select options', () => {
    expect(Array.isArray(ticketSelectOptions)).toBe(true);
    expect(ticketSelectOptions.length).toBe(3);
  });

  it('should have correct structure for each option', () => {
    ticketSelectOptions.forEach(option => {
      expect(option).toHaveProperty('sortKey');
      expect(option).toHaveProperty('sortValue');
      expect(option).toHaveProperty('label');
      expect(typeof option.sortKey).toBe('string');
      expect(typeof option.sortValue).toBe('string');
      expect(typeof option.label).toBe('string');
    });
  });

  it('should have expected first option', () => {
    const firstOption = ticketSelectOptions[0];
    expect(firstOption.sortKey).toBe('createdAt');
    expect(firstOption.sortValue).toBe('newest');
    expect(firstOption.label).toBe('Novos');
  });

  it('should have expected second option', () => {
    const secondOption = ticketSelectOptions[1];
    expect(secondOption.sortKey).toBe('createdAt');
    expect(secondOption.sortValue).toBe('oldest');
    expect(secondOption.label).toBe('Antigos');
  });

  it('should have expected third option', () => {
    const thirdOption = ticketSelectOptions[2];
    expect(thirdOption.sortKey).toBe('bounty');
    expect(thirdOption.sortValue).toBe('bounty');
    expect(thirdOption.label).toBe('Bônus');
  });
});
