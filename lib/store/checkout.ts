import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';

interface CheckoutState {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  setField: (key: keyof Omit<CheckoutState, 'setField' | 'reset'>, value: string) => void;
  reset: () => void;
}

const initialState = {
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
};

// Custom storage that only works on client side
const clientOnlyStorage = {
  getItem: (name: string): StorageValue<CheckoutState> | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(name);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: StorageValue<CheckoutState>) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(name, JSON.stringify(value));
    } catch {
      // Silently fail if localStorage is not available
    }
  },
  removeItem: (name: string) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(name);
    } catch {
      // Silently fail if localStorage is not available
    }
  },
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      ...initialState,
      setField: (key, value) => set(() => ({ [key]: value }) as any),
      reset: () => set({ ...initialState }),
    }),
    {
      name: 'checkout-storage',
      storage: clientOnlyStorage,
    }
  )
);

