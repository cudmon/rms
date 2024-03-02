import { create } from "zustand";
import { Table } from "@/types/entity";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  table: Table;
  setTable: (table: Table) => void;
  clearTable: () => void;
};

export const useTableStore = create<Store>()(
  persist(
    (set, get) => ({
      table: {
        id: "",
        name: "",
      },

      setTable: (table) => {
        set({ table });
      },

      clearTable: () => {
        set({ table: { id: "", name: "" } });
      },
    }),
    {
      name: "table-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
