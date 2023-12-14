import { Text, TextProps } from "@mantine/core";
import { FC } from "react";
import styles from "../table-styles.module.css";
interface TableHeaderProps extends TextProps {
  children: ChildrenType;
}

export const TableHeader: FC<TableHeaderProps> = (_props) => {
  return (
    <th style={{ borderBottom: "none", paddingRight: "1rem" }}>
      <Text component="p" ta={"left"} {..._props} className={styles.header}>
        {_props.children}
      </Text>
    </th>
  );
};
