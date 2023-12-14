"use client";
import { useMapContext } from "@/components/context/map.context";
import { parseFileUrl } from "@/utils/parseFileUrl";
import { Button, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { FC } from "react";

export const PartnerCard: FC<{ partner: Partner }> = ({ partner }) => {
  const { mapRef } = useMapContext();
  const onClick = () => {
    if (!mapRef) return;
    mapRef.flyTo({ lat: partner.lat, lng: partner.long }, 17);
  };

  return (
    <Tooltip
      className="max-w-[350px]"
      content={
        <div>
          {partner.image && (
            <div className="w-full h-[100px] relative">
              <Image
                src={parseFileUrl(partner.image)}
                alt=""
                fill
                unoptimized
              />
            </div>
          )}
          <div>Название: {partner.name}</div>
          <div>Телефон: {partner.contact_phone}</div>
          <div>Адрес: {partner.address}</div>
          <div>
            Принимает:{" "}
            {partner.PartnerMaterials.map((m) => m.material.name).join(", ")}
          </div>
        </div>
      }
    >
      <Button
        variant="light"
        className="text-primary text-[0.85rem] font-medium"
        onClick={onClick}
      >
        {partner.name}
      </Button>
    </Tooltip>
  );
};
