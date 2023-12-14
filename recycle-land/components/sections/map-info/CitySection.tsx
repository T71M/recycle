import { useMapContext } from "@/components/context/map.context";
import { FC } from "react";

export const CitySection: FC = () => {
  const { cities, selectedCity } = useMapContext();

  const cityLabel = Number.isNaN(+selectedCity)
    ? selectedCity
    : cities.find((v) => v.id === +selectedCity)?.name;

  return (
    <div
      className="min-h-[100px] flex flex-col relative"
      style={{ backgroundImage: `url(/city-bg.jpg)`, backgroundSize: "cover" }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-[0.2]" />
      <div className="relative flex flex-1 justify-center items-center h-full text-white font-semibold">
        {cityLabel ?? "Москва"}
      </div>
    </div>
  );
};
