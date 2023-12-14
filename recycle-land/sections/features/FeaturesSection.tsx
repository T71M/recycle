import { FeatureCard } from "@/components/sections/features/FeatureCard";
import { FC } from "react";

export const FeaturesSection: FC = () => {
  return (
    <section id="features" className="section py-[5%]  bg-[#F6F6F6]">
      <div className="section-container flex justify-between xl:flex-row flex-col items-center xl:gap-0 gap-10 xl:items-start w-full">
        <FeatureCard
          title="Поиск"
          image="/feature1.png"
          description="Удобный поиск пунктов приёма по городам"
        />
        <FeatureCard
          image="/feature2.jpg"
          title="Мотивация"
          description="С нами каждый может легко и эффективно делать свой вклад в сохранение окружающей среды и нашей планеты."
        />
        <FeatureCard
          image="/feature3.jpg"
          title="Бесплатно"
          description="Наш сервис дает возможность владельцам пунктов приема вести активную борьбу за сохранение природы, не переживая о затратах на размещение."
        />
      </div>
    </section>
  );
};
