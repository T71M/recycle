import { FC } from "react";
import styles from "./quick-search.module.css";
import { SearchInputFilters } from "@/components/shared/inputs/search-input";
import api from "@/api/appService";
import Image from "next/image";

async function fetchMaterials() {
  const res = await api.materials.readAll();

  return res ?? [];
}

async function fetchCities() {
  const res = await api.cities.readAll();

  return res.cities ?? [];
}

export const QuickSearchSection: FC = async () => {
  const cities = await fetchCities();
  const materials = await fetchMaterials();

  const INPUT_FILTERS = [
    {
      name: "Материал",
      items: materials,
    },
    {
      name: "Город",
      items: cities,
    },
  ] as const;
  return (
    <section className={styles.container} id="banner">
      <Image src={"/bg4.jpg"} fill alt="" objectFit="cover" />
      <div className="opacity-[0.5] bg-black absolute top-0 left-0 right-0 bottom-0" />
      <div className="relative py-[2rem]">
        <h2 className="pl-[5%] text-white font-semibold text-[1.5rem]">
          Найди ближайший пункт приема
        </h2>
        <SearchInputFilters filters={INPUT_FILTERS} />
        <h2 className="text-center text-white text-[2rem] font-semibold">
          Сдавай мусор - береги природу!
        </h2>
      </div>
    </section>
  );
};
