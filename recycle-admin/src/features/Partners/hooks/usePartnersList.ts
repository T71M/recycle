import { useQuery } from "@tanstack/react-query";
import { api } from "../../../main";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { RequestListStatus } from "../../Requests/hooks/useRequestList";

export const usePartnersList = (is_active: RequestListStatus) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debounced] = useDebouncedValue(query, 500);
  const { data, ...rest } = useQuery({
    queryKey: ["PARTNERS", page, is_active, debounced],
    queryFn: () =>
      api.partners.fetchAllPartners({
        page,
        is_active: is_active === "active" ? true : false,
        query: debounced,
      }),
  });

  const total = data?.meta.lastPage ?? 0;

  return {
    partners: data?.data ?? [],
    total,
    page,
    setPage,
    query,
    setQuery,
    ...rest,
  };
};
