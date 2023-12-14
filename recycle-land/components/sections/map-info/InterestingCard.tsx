import Link from "next/link";
import { FC } from "react";

interface Props {
  title: string;
  description: string;
  link: string;
}

export const InterestingCard: FC<Props> = ({ title, description, link }) => {
  return (
    <Link href={link}>
      <div className="border border-gray w-[170px] h-[90px] px-2 flex flex-col justify-center">
        <div className="text-[0.75rem]" style={{ wordBreak: "break-word" }}>
          {title}
        </div>
        <div className="text-[0.65rem] line-clamp-3" style={{ maxHeight: 60 }}>
          {description}
        </div>
      </div>
    </Link>
  );
};
