import { HeaderLinks } from "@/components/layout/header/HeaderLinks";
import { PartnerButton } from "@/components/shared/buttons/partner-button/PartnerButton";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";
import { FaVk, FaTelegramPlane } from "react-icons/fa";

export const AboutSection: FC = () => {
  return (
    <section id="about" className="bg-[#1E1D24] py-[3%] section">
      <div className="section-container justify-between w-full">
        <div className="flex w-full px-[5%] justify-between md:flex-row flex-col md:gap-0 gap-4">
          <div className="max-w-[300px]">
            <div className="text-white text-[1.5rem] font-500">About</div>
            <div className="text-[#79787F] text-[0.875rem] mt-[1rem]">
              JohnnyGo is a large company with more than 10 years of experience
              in helping people with their house problems and malfunctions.
              During our work we helped a huge number of people and have
              garnered a reputation as a stable company with a team of real
              skilled experts who don’t fear any difficulties.{" "}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-white text-[1.5rem] font-500 pb-[1rem] gap-4">
              {" "}
              Ссылки
            </div>
            <HeaderLinks />
          </div>

          <div className="mt-[1rem] flex flex-col gap-4">
            <PartnerButton />
            <Button
              variant="ghost"
              as={Link}
              href="/map"
              className="text-white  hover:!bg-black hover:opacity-[0.75]"
            >
              Карта
            </Button>
            <div className="flex justify-center mt-4 gap-4">
              <div className="text-white text-[2rem]">
                <FaVk />
              </div>
              <div className="text-white text-[2rem]">
                <FaTelegramPlane />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
