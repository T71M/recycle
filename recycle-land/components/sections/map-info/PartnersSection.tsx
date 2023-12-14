"use client";

import { useMapContext } from "@/components/context/map.context";
import { FC } from "react";
import { PartnerCard } from "./PartnerCard";

export const PartnersSection: FC = () => {
  const { partners } = useMapContext();

  console.log("🚀 ~ file: PartnersSection.tsx:9 ~ partners:", partners);

  return (
    <section
      id="partners"
      className="px-1 flex flex-col py-1 flex-1 max-h-full overflow-auto"
    >
      <div className="py-[3%] text-[1.25rem] font-semibold">Партнеры</div>
      <div className="flex flex-1 py-1 flex-wrap gap-4 overflow-auto">
        {partners.map((v) => (
          <PartnerCard partner={v} key={v.id} />
        ))}
      </div>
    </section>
  );
};
