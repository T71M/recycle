import { FC } from "react";

interface Props {
  icon?: React.ReactNode;
  title: string;
}

export const AdvantageCard: FC<Props> = ({ icon, title }) => {
  return (
    <div
      className="flex flex-col md:max-w-[250px] w-full max-w-[180px]"
      style={{ wordBreak: "break-word" }}
    >
      <div>{icon}</div>
      <p className="text-[0.9rem] font-semibold text-center">{title}</p>
    </div>
  );
};
