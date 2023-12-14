import { useQuery } from "@tanstack/react-query";
import { api } from "../../../main";

export const usePartnerRequest = (id: PartnerRequest["id"]) => {
  const { data, ...rest } = useQuery({
    queryKey: ["Request", id],
    queryFn: () => api.requests.readOne(id),
  });

  return { request: data, ...rest };
};
