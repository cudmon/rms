import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Cart = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Store = {
  carts: Cart[];
  add: (item: Cart) => void;
  remove: (id: string) => void;
};

export const useCartsStore = create<Store>()(
  persist(
    (set, get) => ({
      carts: [],

      add: (item) => set((state) => ({ carts: [...state.carts, item] })),

      remove: (id) =>
        set((state) => ({
          carts: state.carts.filter((cart) => cart.id !== id),
        })),
    }),
    {
      name: "carts-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
