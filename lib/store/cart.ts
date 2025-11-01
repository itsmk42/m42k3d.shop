import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

// Custom storage that only works on client side
const clientOnlyStorage = {
  getItem: (name: string): StorageValue<CartStore> | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(name);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: StorageValue<CartStore>) => {
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

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity }],
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: 'cart-storage',
      storage: clientOnlyStorage,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    }
  )
);

