import { ContactsCard } from "@/components/sections/contacts/ContactsCard";
import Link from "next/link";
import { FC } from "react";
import { MdLocalPhone } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export const ContactSection: FC = () => {
  return (
    <section
      id="contacts"
      className="section py-[3%] px-[10%] w-full bg-primary"
    >
      <div className="section-container w-full">
        <div className="flex w-full justify-between xl:flex-row flex-col xl:gap-0 gap-8 items-center">
          <ContactsCard
            icon={
              <div className="text-[2.5rem] text-white">
                <MdLocalPhone />
              </div>
            }
            title={"Телефон:"}
            contact={
              <Link
                href={"tel:7194452809"}
                className="hover:text-green-500 pointer"
              >
                (719) 445-2809
              </Link>
            }
          />
          <ContactsCard
            icon={
              <div className="text-[2.5rem] text-white">
                <FaMapMarkerAlt />
              </div>
            }
            title={"Адрес:"}
            contact={"Москва, ул. Пушкина 2"}
          />
          <ContactsCard
            icon={
              <div className="text-[2.5rem] text-white">
                <IoMdMail />
              </div>
            }
            title={"Почта:"}
            contact={
              <Link
                href={"mailto:info@demolink.org"}
                className="hover:text-green-500 pointer underline"
              >
                info@demolink.org
              </Link>
            }
          />
        </div>
      </div>
    </section>
  );
};
