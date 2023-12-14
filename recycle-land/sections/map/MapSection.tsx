"use client";
import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";

const MapContainer = dynamic(
  () => import("../../components/sections/map/MapContainer"),
  { ssr: false }
);

export const MapSection: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="map" className="section flex-1 min-h-[700px] pr-[1rem]">
      {isMounted && <MapContainer />}
    </section>
  );
};
