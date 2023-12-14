"use client";
import { FC } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { InterestingCard } from "./InterestingCard";
import { Pagination } from "swiper/modules";

export const InterestingSection: FC = () => {
  const pagination = {
    clickable: true,
    dynamicBullets: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <section
      id="interesting"
      className="max-h-[150px] overflow-auto flex-1 border-t py-2"
    >
      <div className="flex justify-between">
        <div className="px-5 pb-2 text-[0.75rem]">Интересное</div>
      </div>

      <div className="pl-1">
        <Swiper
          style={{ paddingBottom: "10px" }}
          modules={[Pagination]}
          slidesPerView={2}
          pagination={pagination}
        >
          <SwiperSlide>
            <InterestingCard
              title="Мусор"
              description="Почему стоит правильно утилизировать мусор?"
              link="#"
            />
          </SwiperSlide>
          <SwiperSlide>
            <InterestingCard
              title="Батарейки"
              description="Как правильно утилизировать аккумуляторы?"
              link="#"
            />
          </SwiperSlide>
          <SwiperSlide>
            <InterestingCard
              title="Мусор"
              description="Почему стоит правильно утилизировать мусор?"
              link="#"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
