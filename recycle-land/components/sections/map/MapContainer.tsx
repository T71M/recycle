"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FC, useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { LocationButton } from "./LocationButton";
import { CityBlock } from "./CityBlock";

import { LocationsMarkers } from "./LocationsMarkers";
import { useMapContext } from "@/components/context/map.context";

const MapContainerBlock: FC = () => {
  const { mapRef, setMap, partners } = useMapContext();

  const [position] = useState<Pick<LatLng, "lat" | "lng">>({
    lng: 37.617665,
    lat: 55.750982,
  });

  useEffect(() => {
    if (!mapRef) return;
    mapRef.setView(position);
  }, [position]);

  const onLocate = () => {
    if (!mapRef) return;
    mapRef.locate();
  };

  if (typeof window === "undefined") return null;

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={position}
        maxZoom={20}
        minZoom={12}
        zoom={13}
        style={{ height: "100%", width: "100%", position: "relative" }}
        ref={(ref) => {
          if (!ref || !setMap) return;
          if (mapRef) return;
          setMap(ref);
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LocationsMarkers markers={partners} />

        <CityBlock />
      </MapContainer>
      <LocationButton onClick={onLocate} />
    </div>
  );
};

export default MapContainerBlock;
