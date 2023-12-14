import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = (search?: string, paramName: string = "page") => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get(paramName)) || 1;
  const renderCount = useRef<number>(0);
  if (renderCount.current < 2) {
    renderCount.current += 1;
  }
  const setPage = useCallback(
    (page: number, replace?: boolean) => {
      searchParams.set(paramName, page.toString());
      setSearchParams(searchParams, { replace: replace });
    },
    [setSearchParams, searchParams, paramName]
  );
  useEffect(() => {
    if (renderCount.current === 1) return;
    setPage(1, true);
  }, [search]);

  return { page, setPage };
};
