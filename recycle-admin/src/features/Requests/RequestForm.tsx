import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { usePartnerRequest } from "./hooks/usePartnerRequest";
import { Link, useParams } from "react-router-dom";
import PageBanner from "../../components/PageBanner";
import { Button, Group, LoadingOverlay, Paper, TextInput } from "@mantine/core";
import { PatternFormat } from "react-number-format";

const crumbs = [
  { title: "Заявки в партнеры", href: "/requests" },
  { title: "Просмотр", href: "#" },
];

export const RequestForm: FC = () => {
  const { requestId } = useParams();
  const { request, isLoading } = usePartnerRequest(Number(requestId));
  const form = useForm<PartnerRequest>();

  useEffect(() => {
    if (!request) return;
    form.reset(request);
  }, [request]);

  return (
    <section>
      <PageBanner items={crumbs} />
      <div
        className="section-container"
        style={{ position: "relative", height: "100%" }}
      >
        <LoadingOverlay visible={isLoading} />

        <Paper p={"md"} shadow="xl" component="form">
          <Controller
            control={form.control}
            name="inn"
            render={({ field }) => (
              <TextInput
                maw={350}
                label="ИНН организации"
                placeholder="ИНН организации"
                readOnly
                {...field}
              />
            )}
          />
          <Controller
            control={form.control}
            name="contact_person"
            render={({ field }) => (
              <TextInput
                maw={350}
                label="Контактное лицо"
                placeholder="Контактное лицо"
                readOnly
                {...field}
              />
            )}
          />
          <Controller
            control={form.control}
            name="contact_phone"
            render={({ field }) => (
              <PatternFormat
                customInput={TextInput}
                format="+# (###) ### ## ##"
                maw={350}
                label="Контактый телефон"
                placeholder="Контактный телефон"
                readOnly
                {...field}
              />
            )}
          />

          <Group justify="end">
            <Button color="brand" component={Link} to={"create"}>
              Подтвердить заявку
            </Button>
          </Group>
        </Paper>
      </div>
    </section>
  );
};
