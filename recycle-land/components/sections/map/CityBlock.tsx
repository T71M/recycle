"use client";

import { useMapContext } from "@/components/context/map.context";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { FC, useEffect } from "react";

export const CityBlock: FC = () => {
  const {
    cities,
    mapRef,
    selectedCity,
    setSelectedCity,
    isCityFromGeo,
    setIsCityFromGeo,
    setCoordinates,
  } = useMapContext();

  useEffect(() => {
    console.debug(selectedCity);
  }, [selectedCity]);
  const isNotAllowed = Number.isNaN(+selectedCity) ? true : false;

  useEffect(() => {
    if (!mapRef) return;
    const city = cities.find((v) => v.id === +selectedCity);
    if (!city || isCityFromGeo) return;
    setCoordinates({
      northLat: city.north_lat,
      northLong: city.north_long,
      southLat: city.east_lat,
      southLong: city.east_long,
    });
    mapRef?.setView({ lat: city.center_lat, lng: city.center_long }, 12);
  }, [selectedCity, mapRef]);

  const onChange = (v: string) => {
    if (!v) return;
    setIsCityFromGeo(false);
    setSelectedCity(v);
  };

  return (
    <div className="absolute bottom-[0.2rem] right-[0.125rem] z-[9999] ">
      <Autocomplete
        radius="sm"
        className=""
        classNames={{ base: "h-6, !p-0" }}
        onSelectionChange={onChange as never}
        selectedKey={selectedCity}
        inputValue={
          isNotAllowed ? selectedCity : !selectedCity ? "Москва" : undefined
        }
        isClearable={false}
        size="sm"
      >
        {cities.map((city) => (
          <AutocompleteItem key={city.id} value={String(city.id)}>
            {city.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};
