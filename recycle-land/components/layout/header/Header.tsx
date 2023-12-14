import Image from "next/image";
import { FC } from "react";
import styles from "./header.module.css";
import { twMerge } from "tailwind-merge";
import { PartnerButton } from "@/components/shared/buttons/partner-button/PartnerButton";
import { HeaderLinks } from "./HeaderLinks";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export const Header: FC = () => {
  return (
    <header className={twMerge(styles.header, "bg-primary")}>
      <div className={"flex items-center gap-2"}>
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="" width={161} height={26} />
        </Link>

        <div className="text-white text-[0.75rem]  mt-[1rem] font-medium lg:block hidden">
          Чистая карта - чистая планета!
        </div>
      </div>
      <div className="flex gap-[1rem] ">
        <HeaderLinks />
        <div className="ml-[5%] flex gap-5 flex-col md:flex-row">
          <PartnerButton />
        </div>
      </div>
    </header>
  );
};
