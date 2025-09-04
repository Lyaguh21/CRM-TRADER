import { create } from "zustand";

interface UserStore {
  userID: string;
  userRole: string;

  setUserID: (id: string) => void;
  setUserRole: (role: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userID: "",
  userRole: "",

  setUserID: (id) => set({ userID: id }),
  setUserRole: (role) => set({ userRole: role }),
}));
