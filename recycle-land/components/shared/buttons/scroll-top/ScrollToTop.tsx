"use client";
import { Button } from "@nextui-org/react";
import { FC, useCallback, useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

function scrollTop() {
  window.scroll({ top: 0, behavior: "smooth" });
}

export const ScrollToTop: FC = () => {
  const [visible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [setIsVisible]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      color="primary"
      className="rounded-[50%] w-[42px] min-w-0 h-[42px] fixed bottom-[10%] right-[1%] z-[999] !p-0"
      onClick={scrollTop}
      style={{ opacity: visible ? "1" : "0", transition: "all 0.3s" }}
    >
      <div className="text-white text-[1.5rem] flex items-center">
        <FaChevronUp />
      </div>
    </Button>
  );
};
