import { create } from "zustand";
import { Table } from "@/types/entity";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  table: Table & { token: string };
  setTable: (table: Table & { token: string }) => void;
  clearTable: () => void;
};

export const useTableStore = create<Store>()(
  persist(
    (set, get) => ({
      table: {
        id: "",
        name: "",
        token: "",
      },

      setTable: (table) => {
        set({ table });
      },

      clearTable: () => {
        set({ table: { id: "", name: "", token: "" } });
      },
    }),
    {
      name: "table-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
