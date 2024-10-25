import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ::::::::::::::::::::::::::::: Layout State
export interface LayoutState {
  openFlashMessage: boolean;
  flashTitle: string;
  flashMessage: string;
  flashSeverity: 'success' | 'danger' | 'warning' | 'message';
  loginLoading: boolean;
}

interface LayoutStore {
  layoutValues: LayoutState;
  setLayoutValues: (values: Partial<LayoutState>) => void;
  resetLayoutState: () => void;
}

const initialLayoutState: LayoutState = {
  openFlashMessage: false,
  flashTitle: '',
  flashMessage: '',
  flashSeverity: 'success',
  loginLoading: false,
};

const useLayoutState = create<LayoutStore>((set) => ({
  layoutValues: initialLayoutState,
  setLayoutValues: (values) => set((state) => ({
    layoutValues: { ...state.layoutValues, ...values }
  })),
  resetLayoutState: () => set({ layoutValues: initialLayoutState }),
}));

export default useLayoutState;