import React from "react";
import { Button } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/react";

export const FilterToggle = ({
  text,
  onClick,
  isActive,
  icon,
}: {
  text: string;
  onClick: () => void;
  isActive: boolean;
  icon: string;
}) => {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <Button
        onClick={onClick}
        className={twMerge(
          "rounded-[50%] min-w-0 !p-0 h-[48px] w-[48px]",
          isActive ? "bg-[#009B20]" : "bg-black"
        )}
      >
        <div
          className={twMerge(
            "flex flex-col items-center",
            isActive ? "text-white" : "text-[#009B20]"
          )}
        >
          <Icon icon={icon} fontSize={"1.5rem"} />
        </div>
      </Button>
      <div
        onClick={onClick}
        style={{ wordBreak: "keep-all" }}
        className="text-[0.7rem] flex justify-center text-center break-words mt-[0.125rem]"
      >
        {text}
      </div>
    </div>
  );
};
