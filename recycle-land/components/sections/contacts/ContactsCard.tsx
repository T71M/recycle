import { FC } from "react";
import { ContactIcon } from "./ContactIcon";
import styles from "./contacts-card.module.css";
interface Props {
  icon: React.ReactNode;
  title: string;
  contact: React.ReactNode;
}

export const ContactsCard: FC<Props> = ({ icon, title, contact }) => {
  return (
    <div className="flex gap-4 items-center w-full max-w-[290px]">
      <div>
        <ContactIcon icon={icon} />
      </div>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{contact}</div>
      </div>
    </div>
  );
};
