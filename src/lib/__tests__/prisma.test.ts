import { describe, expect, it } from 'vitest';

describe('prisma module', () => {
  it('should export prisma instance', async () => {
    const { prisma } = await import('../prisma');
    expect(prisma).toBeDefined();
    expect(typeof prisma).toBe('object');
  });

  it('should be a singleton', async () => {
    const module1 = await import('../prisma');
    const module2 = await import('../prisma');
    expect(module1.prisma).toBe(module2.prisma);
  });
});
