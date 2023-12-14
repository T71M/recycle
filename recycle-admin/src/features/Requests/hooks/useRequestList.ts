import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../../main";
import { useDebouncedValue } from "@mantine/hooks";

export type RequestListStatus = "active" | "inactive";

export const useRequestList = (status: RequestListStatus, perPage?: number) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debounced] = useDebouncedValue(query, 500);
  const { data, ...rest } = useQuery({
    queryKey: ["REQUESTS", status, page, debounced],
    queryFn: () =>
      api.requests.readAll({
        page,
        perPage,
        query: debounced,
        is_active: status === "active" ? true : false,
      }),
  });

  const total = data?.meta.lastPage ?? 0;

  return {
    requests: data?.data ?? [],
    meta: data?.meta,
    page,
    setPage,
    setQuery,
    query,
    total,
    ...rest,
  };
};
