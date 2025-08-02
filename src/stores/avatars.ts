import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AvatarStore = {
  image: string;
  setImage: (image: string) => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const useAvatarStore = create<AvatarStore>()(
  persist(
    set => ({
      image: '/avatars/alien.svg',
      setImage: image => set({ image }),
      hasHydrated: false,
      setHasHydrated: state => set({ hasHydrated: state }),
    }),
    {
      name: 'avatar-store',
      onRehydrateStorage: state => {
        return () => state.setHasHydrated(true);
      },
    },
  ),
);
