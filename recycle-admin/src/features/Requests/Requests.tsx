import { Tabs } from "@mantine/core";
import { FC } from "react";
import { RequestsTable } from "./RequestsTable";
import { useSearchParam } from "../../hooks/useSearchParam";
import { RequestListStatus } from "./hooks/useRequestList";
import PageBanner from "../../components/PageBanner";

const crumbs = [
  {
    title: "Заявки в партнеры",
    href: "",
  },
];

export const Requests: FC = () => {
  const { value, setValue } = useSearchParam<RequestListStatus>({
    param: "tab",
    defaultValue: "active",
    replace: true,
  });
  return (
    <section>
      <PageBanner items={crumbs} />
      <div className="section-container">
        <Tabs
          defaultValue={"active"}
          variant="pills"
          value={value}
          onChange={(v) => setValue(v as RequestListStatus)}
        >
          <Tabs.List>
            <Tabs.Tab
              style={{ textTransform: "uppercase", fontWeight: 600 }}
              value="active"
            >
              Активные
            </Tabs.Tab>
            <Tabs.Tab
              style={{ textTransform: "uppercase", fontWeight: 600 }}
              value="inactive"
            >
              Не активные
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="active">
            <RequestsTable status="active" />
          </Tabs.Panel>
          <Tabs.Panel value="inactive">
            <RequestsTable status="inactive" />
          </Tabs.Panel>
        </Tabs>
      </div>
    </section>
  );
};
