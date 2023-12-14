import { FC } from "react";

import { InputFilters } from "./InputFilters";

export interface Filters {
  filters: Readonly<
    [{ name: "Материал"; items: Material[] }, { name: "Город"; items: City[] }]
  >;
}

export const SearchInputFilters: FC<Filters> = ({ filters }) => {
  return (
    <div className="flex flex-col py-[5%] px-[5%]">
      <div className="mt-[-0.75rem] flex justify-center ">
        <InputFilters materialsFilter={filters[0]} cityFilter={filters[1]} />
      </div>
    </div>
  );
};
