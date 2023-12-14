"use client";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { links } from "./links";
import { HeaderLink } from "./HeaderLink";

export const HeaderLinks: FC = () => {
  const pathname = usePathname();

  if (pathname.includes("/map")) {
    return <HeaderLink text="Главная" link="/" />;
  }

  return (
    <>
      {links.map((v, i) => (
        <HeaderLink {...v} key={i} />
      ))}
    </>
  );
};
