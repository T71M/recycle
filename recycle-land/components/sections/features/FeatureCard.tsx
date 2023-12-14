import { FC } from "react";
import styles from "./feature-card.module.css";
import { Image } from "@nextui-org/react";

import { twMerge } from "tailwind-merge";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

export const FeatureCard: FC<FeatureCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className={twMerge(styles["feature-card"])}>
      <div className={styles.title}>{title}</div>
      <Image radius="none" src={image} className={styles.image} alt="" />
      <div className={styles.description}>{description}</div>
    </div>
  );
};
