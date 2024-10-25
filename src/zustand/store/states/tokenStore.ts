import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ::::::::::::::::::::::::::::: Token State
interface TokenState {
  authToken: {
    access: string;
    refresh: string;
  };
  firstname: string;
  profile_image: string;
  is_active: string;
  is_verified: string;
}

interface TokenStore {
  tokenValues: TokenState;
  setTokenValues: (values: Partial<TokenState>) => void;
  resetTokenState: () => void;
}

const initialTokenState: TokenState = {
  authToken: {
    access: '', 
    refresh: ''
  },
  firstname: 'Anonymous',
  profile_image: '',
  is_active: '',
  is_verified: '',
};

const useTokenState = create<TokenStore>()(
  persist(
    (set) => ({
      tokenValues: initialTokenState,
      setTokenValues: (values) => set((state) => ({
        tokenValues: { ...state.tokenValues, ...values }
      })),
      resetTokenState: () => set({ tokenValues: initialTokenState }),
    }),
    {
      name: 'token-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useTokenState;