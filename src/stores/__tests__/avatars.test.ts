import { beforeEach, describe, expect, it } from 'vitest';

import { useAvatarStore } from '../avatars';

describe('useAvatarStore', () => {
  beforeEach(() => {
    // Reset store to initial state
    useAvatarStore.setState({
      image: '/avatars/alien.svg',
      hasHydrated: false,
    });
  });

  it('should initialize with default avatar', () => {
    const { image } = useAvatarStore.getState();
    expect(image).toBe('/avatars/alien.svg');
  });

  it('should initialize with hasHydrated false', () => {
    const { hasHydrated } = useAvatarStore.getState();
    expect(hasHydrated).toBe(false);
  });

  it('should update avatar image', () => {
    const { setImage } = useAvatarStore.getState();
    const newImage = '/avatars/clown.svg';

    setImage(newImage);

    expect(useAvatarStore.getState().image).toBe(newImage);
  });

  it('should update hydration state', () => {
    const { setHasHydrated } = useAvatarStore.getState();

    setHasHydrated(true);

    expect(useAvatarStore.getState().hasHydrated).toBe(true);
  });

  it('should handle multiple avatar changes', () => {
    const { setImage } = useAvatarStore.getState();

    setImage('/avatars/clown.svg');
    expect(useAvatarStore.getState().image).toBe('/avatars/clown.svg');

    setImage('/avatars/witch_girl.svg');
    expect(useAvatarStore.getState().image).toBe('/avatars/witch_girl.svg');

    setImage('/avatars/alien.svg');
    expect(useAvatarStore.getState().image).toBe('/avatars/alien.svg');
  });
});
