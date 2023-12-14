import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { array, number, object, string } from "yup";
import { usePartnerRequest } from "./hooks/usePartnerRequest";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PageBanner from "../../components/PageBanner";
import { Button, Group, LoadingOverlay, Paper } from "@mantine/core";
import { coordinateSchema } from "../../schemas";

import { useCreatePartner } from "../Partners/hooks/useCreatePartner";
import { useMaterials } from "../../api/hooks/useMaterials";
import { PartnerSharedForm } from "../../components/forms/PartnerSharedForm";

const schema = object({
  name: string().required("Обязательное поле"),
  contact_person: string().required("Обязательное поле!"),
  contact_phone: string()
    .required("Обязательное поле!")
    .trim()
    .length(18, "Невалидный номер телефона"),

  lat: coordinateSchema,
  long: coordinateSchema,
  address: string().required("Обязательное поле"),
  website: string().url("Невалидный адрес"),
  materials: array()
    .of(number())
    .min(1, "Пункт должен принимать хотябы 1 материал")
    .typeError("Обязательное поле"),
}) as never;

const crumbs = [
  { title: "Заявки в партнеры", href: "/requests" },
  { title: "Заявка", href: -1 },
  { title: "Подтвердить", href: "#" },
];

export const CreatePartnerForm: FC = () => {
  const { isLoading: isMaterialsLoading } = useMaterials();
  const { requestId } = useParams();
  const { request, isLoading } = usePartnerRequest(Number(requestId));
  const { handleCreate, isLoading: isCreating } = useCreatePartner();
  const { control, ...form } = useForm<Partner>({
    resolver: yupResolver(schema),
    defaultValues: {
      image: "",
      materials: [],
    },
  });

  useEffect(() => {
    if (!request) return;
    form.reset({ ...request, image: "", materials: [] });
  }, [request]);

  const handleSubmit = async (values: Partner) => {
    await handleCreate(
      { ...values, id: undefined as never },
      Number(requestId)
    );
  };

  return (
    <FormProvider {...form} control={control}>
      <section>
        <PageBanner items={crumbs} />
        <div className="section-container">
          <Paper
            p={"md"}
            shadow="xl"
            component="form"
            onSubmit={form.handleSubmit(handleSubmit, (e) => console.debug(e))}
          >
            <LoadingOverlay visible={isLoading || isMaterialsLoading} />
            <PartnerSharedForm />
            <Group justify="end" mt={"2rem"}>
              <Button type="submit" loading={isCreating}>
                Подтвердить
              </Button>
            </Group>
          </Paper>
        </div>
      </section>
    </FormProvider>
  );
};
