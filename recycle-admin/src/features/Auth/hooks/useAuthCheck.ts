import { useCallback, useMemo } from "react";

import { useWhoami } from "./useWhoami";
import tokenStorage from "../../../token/tokenStorage";
import { useAuthStore } from "../../../store/authStore";

export function useAuthCheck() {
  const { refetch, data } = useWhoami();
  const { user, login, logout, isLoggedIn } = useAuthStore((state) => ({
    ...state,
  }));

  const isAuthorized = useMemo(() => {
    return Boolean(isLoggedIn && !!data);
  }, [isLoggedIn, data]);

  const checkAuth = useCallback(async () => {
    const token = tokenStorage.getToken();
    console.log("checking auth token", token);
    if (!token) return;

    try {
      const res = await refetch();
      if (!res.data) return;
      login(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      logout();

      return false;
    }
  }, [refetch, login, logout]);

  return {
    user,
    checkAuth,
    isAuthorized,
  };
}
