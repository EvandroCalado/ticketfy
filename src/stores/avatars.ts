import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AvatarStore = {
  option: {
    bg: string;
    text: string;
  };
  setOption: (option: { bg: string; text: string }) => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const useAvatarStore = create<AvatarStore>()(
  persist(
    set => ({
      option: {
        bg: 'bg-gradient-to-br from-gray-300 to-slate-300',
        text: 'text-gray-800',
      },
      setOption: option => set({ option }),
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
