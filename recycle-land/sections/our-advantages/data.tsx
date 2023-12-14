import { GiModernCity } from "react-icons/gi";
import { IoEarthOutline } from "react-icons/io5";
import { TbFreeRights } from "react-icons/tb";

export const ADVANTAGES = [
  {
    icon: (
      <div className="flex justify-center text-[3rem]">
        <GiModernCity />
      </div>
    ),
    title: "Удобный поиск пунктов приёма по городам",
  },
  {
    icon: (
      <div className="flex justify-center text-[3rem]">
        <IoEarthOutline />
      </div>
    ),
    title: "Люди будут больше бороться за чистоту",
  },
  {
    icon: (
      <div className="flex justify-center text-[3rem]">
        <TbFreeRights />
      </div>
    ),
    title: "Бесплатное размещение навсегда",
  },
];
