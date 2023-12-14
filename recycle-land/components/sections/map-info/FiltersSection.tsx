"use client";
import { FC } from "react";
import { useMapContext } from "@/components/context/map.context";

import { FilterToggle } from "@/components/shared/inputs/filter-checkbox/FilterToggle";

export const MapFiltersSection: FC = () => {
  const { filters } = useMapContext();
  const { selectedMaterials, setSelectedMaterials } = useMapContext();
  const selected = new Set(selectedMaterials);
  return (
    <section
      id="filters"
      className="flex flex-col gap-2 w-full px-1 py-4 flex-1 max-h-full overflow-auto"
    >
      <div className="text-[1.25rem] font-semibold">Фильтры</div>
      <div className="flex flex-wrap justify-between  overflow-auto">
        {filters.map((v) => (
          <div key={v.id} className="max-w-[25%] w-[100%] p-1">
            <FilterToggle
              text={v.name}
              isActive={selected.has(String(v.id))}
              icon={v.icon}
              onClick={() => {
                if (selected.has(String(v.id))) {
                  selected.delete(String(v.id));
                  setSelectedMaterials(Array.from(selected));
                } else {
                  selected.add(String(v.id));
                  setSelectedMaterials(Array.from(selected));
                }
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
