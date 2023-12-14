import { create } from "zustand";
import { devtools } from "zustand/middleware";
import tokenStorage from "../token/tokenStorage";

interface UserState {
  user?: User;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<UserState>()(
  devtools((set) => ({
    user: undefined,
    isLoggedIn: false,
    login: (user) =>
      set(() => ({
        user: user as never,
        isLoggedIn: true,
      })),
    logout: () => {
      tokenStorage.removeToken();
      set(() => ({
        user: undefined,
        isLoggedIn: false,
      }));
    },
  }))
);
