import { FC } from "react";

interface TableDataProps extends React.HTMLProps<HTMLTableCellElement> {
  children: ChildrenType;
}

export const TableData: FC<TableDataProps> = ({ children, ...rest }) => {
  return (
    <td style={{ padding: "0.5rem 0.5rem" }} {...rest}>
      {children}
    </td>
  );
};
