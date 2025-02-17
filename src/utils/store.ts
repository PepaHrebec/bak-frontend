import { create } from "zustand";

interface User {
  name: string;
  id: string;
}

type UserStore = {
  user: User | undefined;
  //   inc: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: undefined,
  //   inc: () => set((state) => ({ count: state.count + 1 })),
}));
