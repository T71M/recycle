import api from "@/api/appService";
import useSWR from "swr";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { laggy } from "@/utils/laggy";

interface Params {
  materials: string[];
}

export const usePartnersList = ({ materials }: Params) => {
  const [coordinates, setCoordinates] = useState<CoordinatesRequest>();

  const debouncedCoordinates = useDebounce(coordinates, 500);
  const { data, ...rest } = useSWR(
    [debouncedCoordinates, materials],
    ([cords, materials]) => api.geo.getPartners(cords, materials),
    { use: [laggy] }
  );

  return {
    partners: data?.partners ?? [],
    setCoordinates,
    ...rest,
  };
};
