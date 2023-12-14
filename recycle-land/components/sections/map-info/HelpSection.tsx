import Link from "next/link";
import { FC } from "react";

export const HelpSection: FC = () => {
  return (
    <div className="py-[0.5rem] border-t border-t-gray flex justify-between">
      <Link
        href={"/for-partners"}
        className="text-[0.85rem] px-[1rem] text-primary font-medium"
      >
        Для партнеров
      </Link>
      <Link
        href={"/help"}
        className="text-[0.85rem] px-[1rem] text-primary font-medium"
      >
        Помощь
      </Link>
    </div>
  );
};
