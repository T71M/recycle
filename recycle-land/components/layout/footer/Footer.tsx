import { AboutSection } from "@/sections/footer/AboutSection";
import { CopyrightSection } from "@/sections/footer/CopyrightSection";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer>
      <AboutSection />
      <CopyrightSection />
    </footer>
  );
};
