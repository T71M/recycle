import { useQuery } from "@tanstack/react-query";
import { api } from "../../main";

export const useMaterials = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["MATERIALS"],
    queryFn: () => api.materials.readAll(),
  });

  return { materials: data ?? [], ...rest };
};
