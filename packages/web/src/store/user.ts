import { create } from "zustand";
import { User } from "@/types/entity";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  user: Pick<User, "id" | "username" | "role">;
  loggedIn: boolean | null;

  setUser: (user: Store["user"]) => void;
  removeUser: () => void;
};

export const useUserStore = create<Store>()(
  persist(
    (set, get) => ({
      user: {
        id: "",
        username: "",
        role: "",
      },
      loggedIn: null,

      setUser: (user) => {
        set({ user, loggedIn: true });
      },

      removeUser: () => {
        set({
          loggedIn: false,
          user: { id: "", username: "", role: "" },
        });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
