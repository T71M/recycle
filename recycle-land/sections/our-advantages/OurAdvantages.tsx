import { FC } from "react";
import { ADVANTAGES } from "./data";
import { AdvantageCard } from "@/components/sections/our-advantages/AdvantageCard";

export const OurAdvantagesSection: FC = () => {
  return (
    <section id="advantages" className="section py-[3%]">
      <div className="section-container">
        <h2 className="text-[2rem] font-semibold pb-8 text-center">
          Наши преимущества!
        </h2>
        <div className="flex justify-between md:flex-row flex-col items-center gap-5">
          {ADVANTAGES.map((v, i) => (
            <AdvantageCard {...v} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
