import { Link } from "@nextui-org/react";
import { FC } from "react";
import NextLink from "next/link";
import { Link as LinkType } from "./links";
import styles from "./header.module.css";

interface HeaderLinkProps extends LinkType {}

export const HeaderLink: FC<HeaderLinkProps> = ({ text, link }) => {
  return (
    <Link as={NextLink} className={styles.link} href={link}>
      {text}
    </Link>
  );
};
