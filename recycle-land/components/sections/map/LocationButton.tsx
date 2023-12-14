"use client";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import { FaLocationArrow } from "react-icons/fa";
interface Props {
  onClick?: () => void;
}

export const LocationButton: FC<Props> = ({ onClick }) => {
  const onLocateClick = () => {
    onClick && onClick();
  };
  return (
    <Button
      onClick={() => onLocateClick()}
      className="absolute z-[999] top-[5rem] left-[0.73rem] rounded-[0.125rem] bg-white hover:bg-[#f4f4f4] border-[2px] border-[rgba(0,0,0,0.2)] w-[2rem] h-[2rem] !min-w-0 min-h-0 !p-0 "
    >
      <div className="flex text-black text-[0.75rem] ">
        <FaLocationArrow />
      </div>
    </Button>
  );
};
