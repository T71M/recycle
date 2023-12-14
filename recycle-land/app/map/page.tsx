import api from "@/api/appService";
import { MapPageWrapper } from "@/components/sections/map";

import { FC } from "react";

async function fetchFilters() {
  const filters = await api.materials.readAll();

  return filters ?? [];
}

async function fetchCities() {
  const cities = await api.cities.readAll();

  return cities?.cities ?? [];
}

const MapPage: FC = async () => {
  const filters = await fetchFilters();
  const cities = await fetchCities();
  return (
    <main className="w-full min-h-[calc(100vh-130px)] flex-1 flex ">
      <MapPageWrapper filters={filters} cities={cities} />
    </main>
  );
};

export default MapPage;
