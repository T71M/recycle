import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePartner } from "./hooks/usePartner";
import { FormProvider, useForm } from "react-hook-form";
import { number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Group, LoadingOverlay, Paper } from "@mantine/core";
import { useCreatePartner } from "./hooks/useCreatePartner";
import { usePartnerUpdate } from "./hooks/usePartnerUpdate";
import { useMaterials } from "../../api/hooks/useMaterials";
import PageBanner from "../../components/PageBanner";
import { PartnerSharedForm } from "../../components/forms/PartnerSharedForm";

const schema = object({
  name: string().required("Обязательное поле!"),
  lat: number().required("Обязательное поле!"),
  long: number().required("Обязательное поле!"),
}) as never;

function getCrumbs(id?: string) {
  if (id) {
    return [
      {
        href: "/partners",
        title: "Партнеры",
      },
      { href: "#", title: "Редактировать" },
    ];
  }
  return [
    {
      href: "/partners",
      title: "Партнеры",
    },
    { href: "#", title: "Добавить" },
  ];
}

export const PartnerForm: FC = () => {
  const { isLoading: isMaterialsLoading } = useMaterials();
  const { partnerId } = useParams();
  const { partner, isLoading } = usePartner(Number(partnerId));
  const { control, ...form } = useForm<Partner>({
    resolver: yupResolver(schema),
    defaultValues: {
      materials: [],
    },
  });
  const { handleCreate, isLoading: isCreating } = useCreatePartner();
  const { handleUpdate, isPending: isUpdating } = usePartnerUpdate();

  const onSubmit = async (values: Partner) => {
    if (!partnerId) {
      return await handleCreate(values);
    }
    return await handleUpdate(values);
  };

  useEffect(() => {
    if (!partner) return;
    form.reset(partner);
  }, [partner]);

  return (
    <FormProvider {...form} control={control}>
      <section>
        <PageBanner items={getCrumbs(partnerId)} />
        <div className="section-container">
          <Paper
            p={"md"}
            shadow="xl"
            component="form"
            onSubmit={form.handleSubmit(onSubmit, (e) => console.debug(e))}
          >
            <LoadingOverlay visible={isLoading || isMaterialsLoading} />
            <PartnerSharedForm />
            <Group justify="end" mt={"2rem"}>
              <Button type="submit" loading={isCreating || isUpdating}>
                Подтвердить
              </Button>
            </Group>
          </Paper>
        </div>
      </section>
    </FormProvider>
  );
};
