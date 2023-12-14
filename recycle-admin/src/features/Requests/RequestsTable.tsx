import { FC } from "react";
import { RecycleTable } from "../../components/Table/RecycleTable";
import { useRequestList } from "./hooks/useRequestList";
import { RequestRow } from "./RequestRow";
import { TextInput } from "@mantine/core";

const titles: string[] = [
  "Номер",
  "ИНН",
  "Контактное лицо",
  "Контактный Номер",
  "Статус",
];

interface Props {
  status: "active" | "inactive";
}

export const RequestsTable: FC<Props> = ({ status }) => {
  const { requests, page, setPage, isLoading, query, setQuery, total } =
    useRequestList(status);

  const rows = requests.map((req) => <RequestRow request={req} key={req.id} />);

  return (
    <>
      <TextInput
        my={20}
        maw={300}
        value={query}
        label="Найти"
        placeholder="Найти"
        onChange={(e) => setQuery(e.target.value)}
      />
      <RecycleTable
        titles={titles}
        rows={rows}
        total={total}
        page={page}
        setPage={setPage}
        loading={isLoading}
      />
    </>
  );
};
