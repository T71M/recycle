"server-only";
export interface Link {
  text: string;
  link: string;
}
export const links: Link[] = [
  {
    text: "Карта",
    link: "/map",
  },
  {
    text: "Поиск",
    link: "#banner",
  },
  {
    text: "Партнерство",
    link: "#partnership",
  },
  {
    text: "Возможности",
    link: "#features",
  },
];

export const mapLinks: Link[] = [{ text: "Главная", link: "/" }];
