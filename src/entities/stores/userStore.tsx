import { create } from "zustand";

interface UserStore {
  userID: string;
  userRole: string;

  setUserID: (id: string) => void;
  setUserRole: (role: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userID: "796343476",
  userRole: "Admin",

  setUserID: (id) => set({ userID: id }),
  setUserRole: (role) => set({ userRole: role }),
}));
