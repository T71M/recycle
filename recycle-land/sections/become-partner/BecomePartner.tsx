import { BecomePartnerForm } from "@/components/sections/become-partner/BecomePartnerForm";
import { FC } from "react";

export const BecomePartnerSection: FC = () => {
  return (
    <section id="become-partner" className="section py-[3%]">
      <div className="section-container">
        <h2 className="text-center font-semibold text-[1.5rem] md:px-0 px-4">
          Добавьте свой пункт приёма на ПОИСК БЕСПЛАТНО
        </h2>
        <BecomePartnerForm />
      </div>
    </section>
  );
};
