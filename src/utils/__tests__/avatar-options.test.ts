import { describe, expect, it } from 'vitest';

import { avatarOptions } from '../avatar-options';

describe('avatar-options', () => {
  it('should export an array of avatar options', () => {
    expect(Array.isArray(avatarOptions)).toBe(true);
    expect(avatarOptions.length).toBeGreaterThan(0);
  });

  it('should have correct structure for each avatar option', () => {
    avatarOptions.forEach(option => {
      expect(option).toHaveProperty('image');
      expect(typeof option.image).toBe('string');
      expect(option.image).toMatch(/^\/avatars\/.*\.svg$/);
    });
  });

  it('should contain expected avatar options', () => {
    const expectedAvatars = [
      'alien.svg',
      'clown.svg',
      'jack.svg',
      'mummy.svg',
      'prisoner.svg',
      'reaper.svg',
      'valak.svg',
      'werewolf.svg',
      'witch_girl.svg',
      'zack.svg',
      'zombie_girl.svg',
    ];

    expectedAvatars.forEach(avatar => {
      const found = avatarOptions.some(option => option.image.includes(avatar));
      expect(found).toBe(true);
    });
  });

  it('should have exactly 11 avatar options', () => {
    expect(avatarOptions).toHaveLength(11);
  });

  it('should have unique avatar images', () => {
    const images = avatarOptions.map(option => option.image);
    const uniqueImages = [...new Set(images)];
    expect(images).toHaveLength(uniqueImages.length);
  });
});
