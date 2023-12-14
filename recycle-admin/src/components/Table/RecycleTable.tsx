import {
  Box,
  Group,
  LoadingOverlay,
  Pagination,
  ScrollArea,
  Table,
  TableProps,
} from "@mantine/core";
import { FC } from "react";
import DeleteButton from "./components/DeleteButton";
import { TableRow } from "./components/TableRow";
import { TableData } from "./components/TableData";
import { TableHeader } from "./components/Tableheader";
import EditButton from "./components/EditButton";
import { CopyButton } from "./components/CopyButton";
import { EmptyLabel } from "../../utils/EmptyLabel";

interface MinLaborTableProps extends Partial<TableProps> {
  rows: React.ReactNode[];
  headerStyles?: React.CSSProperties;
  loading?: boolean;
  page?: number;
  total?: number;
  setPage?: (v: number) => void;
}

type DefaultMinLaborTableProp = MinLaborTableProps & {
  titles: string[];
  customTitles?: never;
};

type CustomMinLaborTableProps = MinLaborTableProps & {
  customTitles: React.ReactNode;
  titles?: never;
};

type Props = DefaultMinLaborTableProp | CustomMinLaborTableProps;

type RecycleTableComponent = FC<Props> & {
  DeleteButton: typeof DeleteButton;
  TableRow: typeof TableRow;
  TableData: typeof TableData;
  EditButton: typeof EditButton;
  CopyButton: typeof CopyButton;
};

export const RecycleTable: RecycleTableComponent = ({
  titles,
  rows,
  headerStyles,
  loading,
  page,
  total,
  customTitles,
  setPage = () => {},
  ...rest
}) => {
  return (
    <>
      <Box
        style={{
          minWidth: "calc(100vw - 200px)",
          width: "max-content",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        <ScrollArea w={"calc(100vw - 250px)"} pb={"1rem"}>
          <LoadingOverlay overlayProps={{ blur: 1 }} visible={!!loading} />
          <Table {...rest} style={{ minWidth: "max-content", width: "100%" }}>
            {titles && (
              <thead>
                <tr>
                  {titles.map((title, i) => (
                    <TableHeader style={headerStyles} key={i}>
                      {title}
                    </TableHeader>
                  ))}
                </tr>
              </thead>
            )}
            {customTitles && (
              <thead>
                <tr>{customTitles}</tr>
              </thead>
            )}
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Box>
      {!loading && !rows?.length && <EmptyLabel />}
      <Group justify="center">
        <Pagination
          value={page}
          mt={"1rem"}
          total={total ?? 0}
          onChange={setPage}
          style={{ display: !page ? "none" : undefined }}
        />
      </Group>
    </>
  );
};

RecycleTable.DeleteButton = DeleteButton;
RecycleTable.TableRow = TableRow;
RecycleTable.TableData = TableData;
RecycleTable.EditButton = EditButton;
RecycleTable.CopyButton = CopyButton;
