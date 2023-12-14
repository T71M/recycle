import { FC } from "react";
import { PartnersTable } from "./PartnersTable";
import PageBanner from "../../components/PageBanner";
import { RequestListStatus } from "../Requests/hooks/useRequestList";
import { Tabs } from "@mantine/core";
import { useSearchParam } from "../../hooks/useSearchParam";

const crumbs = [
  {
    title: "Партнеры",
    href: "#",
  },
];

export const Partners: FC = () => {
  const { value, setValue } = useSearchParam<RequestListStatus>({
    param: "tab",
    defaultValue: "active",
    replace: true,
  });
  return (
    <section>
      <PageBanner items={crumbs} canAdd link="/partners/create" />
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
            <PartnersTable status="active" />
          </Tabs.Panel>
          <Tabs.Panel value="inactive">
            <PartnersTable status="inactive" />
          </Tabs.Panel>
        </Tabs>
      </div>
    </section>
  );
};
