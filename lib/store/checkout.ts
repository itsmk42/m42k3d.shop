import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';

interface CheckoutState {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  paymentMethod: 'upi' | 'cod' | 'stripe';
  _hasHydrated: boolean;
  setField: (key: keyof Omit<CheckoutState, 'setField' | 'reset' | 'setPaymentMethod' | '_hasHydrated'>, value: string) => void;
  setPaymentMethod: (method: 'upi' | 'cod' | 'stripe') => void;
  reset: () => void;
}

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pinCode: '',
  country: 'India',
  paymentMethod: 'cod' as const,
  _hasHydrated: false,
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
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      reset: () => set({ ...initialState }),
    }),
    {
      name: 'checkout-storage',
      storage: clientOnlyStorage,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    }
  )
);

