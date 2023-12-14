"use client";

import { LatLng } from "leaflet";
import { FC } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import Image from "next/image";
import { parseFileUrl } from "@/utils/parseFileUrl";
interface Props {
  markers: Partner[];
}

export const LocationsMarkers: FC<Props> = ({ markers }) => {
  const markerAdapter = markers.map((v) => ({
    ...v,
    latlng: new LatLng(v.lat, v.long),
    id: v.id,
    name: v.name,
  }));

  return (
    <>
      {markerAdapter.map((marker) => (
        <Marker
          position={marker.latlng}
          key={marker.id}
          icon={
            new Icon({
              iconUrl: "/recycle-logo2.svg",
              iconSize: [30, 30],
              iconAnchor: [12, 41],
            })
          }
        >
          <Tooltip key={marker.id}>{marker.name}</Tooltip>
          <Popup autoPan={false}>
            {marker.image && (
              <div className="w-full h-[100px] relative">
                <Image
                  src={parseFileUrl(marker.image)}
                  alt=""
                  fill
                  unoptimized
                />
              </div>
            )}
            <div>Адрес: {marker.address}</div>
            <div>Телефон: {marker.contact_phone}</div>
            <div>
              Принимает:{" "}
              {marker.PartnerMaterials.map((m) => m.material.name).join(", ")}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};
