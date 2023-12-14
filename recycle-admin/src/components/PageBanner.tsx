import { Breadcrumbs, Flex, Text } from "@mantine/core";
import { Link, To } from "react-router-dom";
import AddButton from "./Buttons/AddButton";

type BannerItem = { title: React.ReactNode; href: string | number };

interface Props {
  items: BannerItem[];
  link?: string;
  canAdd?: boolean;
}

export default function PageBanner({ items, link = "", canAdd }: Props) {
  const crumbs = items.map((v, i) => (
    <Text size={"1.5rem"} component={Link} to={v.href as To} key={i}>
      {v.title}
    </Text>
  ));
  return (
    <Flex
      bg={"brand.8"}
      style={{
        borderBottom: 0,
        boxShadow: "1px 1px 3px rgba(0, 0, 0, .25)",
        color: "#ffffff",
        padding: "20px 20px 20px 30px",
      }}
      justify={"space-between"}
      align={"center"}
    >
      <Breadcrumbs
        styles={{
          separator: {
            color: "white",
            fontSize: "1.5rem",
            marginTop: "0.25rem",
          },
        }}
        separator="→"
      >
        {crumbs}
      </Breadcrumbs>
      {canAdd && <AddButton mr={"1rem"} link={link} />}
    </Flex>
  );
}
