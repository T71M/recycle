"use client";
import api from "@/api/appService";
import { MapContextProvider } from "@/components/context/map.context";
import { usePartnersList } from "@/components/sections/map/hooks/usePartnersList";
import { MapInfoSection } from "@/sections/map-info/MapInfoSection";
import { MapSection } from "@/sections/map/MapSection";
import { LeafletEvent, LocationEvent, Map } from "leaflet";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";

interface Props {
  filters: Material[];
  cities: City[];
}

export const MapPageWrapper: FC<Props> = ({ filters, cities }) => {
  const params = useSearchParams();
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    params.getAll("materials") ?? []
  );
  useEffect(() => {
    console.debug(selectedMaterials);
  }, [selectedMaterials]);
  const [mapRef, setMap] = useState<Map | null>(null);
  const { partners, setCoordinates } = usePartnersList({
    materials: selectedMaterials,
  });
  const [selectedCity, setSelectedCity] = useState<string>(
    params.get("city") ?? ""
  );
  const [isCityFromGeo, setIsCityFromGeo] = useState(false);

  const onLocationFound = useCallback(
    async (e: LocationEvent) => {
      mapRef?.setView(e.latlng, 15);
      const data = await api.geo.getGeoByCoordinates(e.latlng);
      if (!data) return;
      setIsCityFromGeo(true);
      if (data.city) {
        setSelectedCity(data.city);
      } else {
        setSelectedCity(String(data.allowedCity?.id));
      }
    },
    [mapRef]
  );

  const onMove = useCallback(
    (e: LeafletEvent) => {
      const { target } = e;
      if (!target.getBounds) return;
      const bounds = target.getBounds() as MapBounds;
      if (!bounds) return;
      const parsedCoordinates: CoordinatesRequest = {
        northLat: bounds._northEast.lat,
        northLong: bounds._northEast.lng,
        southLat: bounds._southWest.lat,
        southLong: bounds._southWest.lng,
      };
      console.debug("movened");
      setCoordinates(parsedCoordinates);
    },
    [setCoordinates]
  );

  useEffect(() => {
    if (!mapRef) return;
    mapRef.addEventListener("moveend", onMove);
    mapRef.addEventListener("locationfound", onLocationFound);
    console.log(location.origin);
    if (!selectedCity) {
      mapRef.locate();
      if (process.env.NODE_ENV === "development") return;
      if (location.origin.startsWith("http://")) {
        const north = mapRef.getBounds()?.getNorthEast();
        const south = mapRef.getBounds()?.getSouthWest();
        if (!north || !south) return;
        const newBounds = {
          northLat: north.lat,
          northLong: north.lng,
          southLat: south.lat,
          southLong: south.lng,
        };
        setCoordinates(newBounds);
      }
    }

    return () => {
      mapRef.removeEventListener("moveend", onMove);
      mapRef.removeEventListener("locationfound", onLocationFound);
    };
  }, [mapRef]);

  return (
    <MapContextProvider
      mapRef={mapRef}
      setMap={setMap}
      partners={partners}
      filters={filters}
      cities={cities}
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      selectedMaterials={selectedMaterials}
      setSelectedMaterials={setSelectedMaterials}
      isCityFromGeo={isCityFromGeo}
      setIsCityFromGeo={setIsCityFromGeo}
      setCoordinates={setCoordinates}
    >
      <MapInfoSection />
      <MapSection />
    </MapContextProvider>
  );
};
