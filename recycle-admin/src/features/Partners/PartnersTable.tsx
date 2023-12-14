import { FC } from "react";
import { RecycleTable } from "../../components/Table/RecycleTable";
import { PartnerRow } from "./PartnerRow";
import { usePartnersList } from "./hooks/usePartnersList";
import { RequestListStatus } from "../Requests/hooks/useRequestList";
import { TextInput } from "@mantine/core";

const titles = ["Название", "ИНН", "Контактное лицо", "Телефон", "Статус"];

interface Props {
  status: RequestListStatus;
}

export const PartnersTable: FC<Props> = ({ status }) => {
  const { partners, isLoading, page, setPage, total, query, setQuery } =
    usePartnersList(status);

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
        loading={isLoading}
        page={page}
        total={total}
        setPage={setPage}
        rows={partners.map((v) => (
          <PartnerRow partner={v} key={v.id} />
        ))}
      />
    </>
  );
};
