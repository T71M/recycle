import { useEffect, useState } from "react";
import { useAuthCheck } from './useAuthCheck';

export const useAuthorizeWatcher = () => {
  const { checkAuth, isAuthorized } = useAuthCheck();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(() => console.log("successfully authorized"))
      .catch(() => console.error("authorization failed"))
      .finally(() => setCanRender(true));
  }, [checkAuth]);

  return {
    canRender,
    isAuthorized
  };
};
