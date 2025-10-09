import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      ...initialState,
      setField: (key, value) => set(() => ({ [key]: value }) as any),
      reset: () => set({ ...initialState }),
    }),
    { name: 'checkout-storage' }
  )
);

