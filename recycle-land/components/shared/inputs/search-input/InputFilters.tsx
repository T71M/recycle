"use client";
import { FC, useState } from "react";
import { InputFilter } from "./InputFilter";
import { Filters } from ".";
import { Button } from "@nextui-org/react";
import queryString from "query-string";
import Link from "next/link";

interface Props {
  cityFilter: Filters["filters"][1];
  materialsFilter: Filters["filters"][0];
}

export const InputFilters: FC<Props> = ({ cityFilter, materialsFilter }) => {
  const [material, onMaterialChange] = useState(new Set<string>(""));
  const [city, onCityChange] = useState(new Set<string>(""));
  const qs = queryString.stringify({
    city: Array.from(city),
    materials: Array.from(material),
  });
  return (
    <div className="flex max-w-[650px] w-[100%] md:justify-between flex-col md:flex-row items-center gap-8 md:gap-0">
      <InputFilter
        items={materialsFilter.items}
        name={materialsFilter.name}
        value={material}
        onChange={onMaterialChange}
        multiply
      />
      <InputFilter
        items={cityFilter.items}
        name={cityFilter.name}
        value={city}
        onChange={onCityChange}
        multiply={false}
      />
      <Button
        className="bg-red-600 !text-white text-8 font-semibold max-w-[170px] w-full"
        as={Link}
        href={
          {
            pathname: `/map`,
            query: qs,
          } as never
        }
      >
        Найти на карте
      </Button>
    </div>
  );
};
