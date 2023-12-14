import { FC } from "react";
import styles from "./contacts-card.module.css";
import { twMerge } from "tailwind-merge";

interface Props {
  icon: React.ReactNode;
}

export const ContactIcon: FC<Props> = ({ icon }) => {
  return (
    <div className={twMerge(styles.icon, "bg-green-500")}>
      <div className={styles.overlay}>{icon}</div>
    </div>
  );
};
