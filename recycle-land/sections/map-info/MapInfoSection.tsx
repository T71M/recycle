import { FC } from "react";
import styles from "./map-info-section.module.css";
import { MapFiltersSection } from "@/components/sections/map-info/FiltersSection";
import { twMerge } from "tailwind-merge";
import { PartnersSection } from "@/components/sections/map-info/PartnersSection";
import { CitySection } from "@/components/sections/map-info/CitySection";
import { HelpSection } from "@/components/sections/map-info/HelpSection";
import { InterestingSection } from "@/components/sections/map-info/Interesting";
export const MapInfoSection: FC = () => {
  return (
    <section id="map-info" className={twMerge(styles.section)}>
      <CitySection />
      <MapFiltersSection />
      <PartnersSection />
      <InterestingSection />
      <HelpSection />
    </section>
  );
};
