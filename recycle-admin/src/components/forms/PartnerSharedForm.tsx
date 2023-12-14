import { Group, TextInput, NumberInput, Textarea } from "@mantine/core";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { FileForm } from "./FileForm";
import { MaterialsSelectForm } from "./MaterialsSelectForm";

export const PartnerSharedForm: FC = () => {
  const { control } = useFormContext<Partner>();

  return (
    <>
      <div style={{ maxWidth: 717 }}>
        <Group>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <TextInput
                maw={350}
                w={"100%"}
                withAsterisk
                label="Название организации"
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="inn"
            render={({ field, fieldState }) => (
              <TextInput
                maw={350}
                w={"100%"}
                withAsterisk
                label="ИНН организации"
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
        </Group>

        <Group>
          <Controller
            control={control}
            name="contact_person"
            render={({ field, fieldState }) => (
              <TextInput
                maw={350}
                w={"100%"}
                withAsterisk
                label="Контактное лицо"
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="contact_phone"
            render={({ field }) => (
              <PatternFormat
                withAsterisk
                w={"100%"}
                customInput={TextInput}
                format="+# (###) ### ## ##"
                maw={350}
                label="Контактый телефон"
                placeholder="Контактный телефон"
                {...field}
              />
            )}
          />
        </Group>
        <Group>
          <Controller
            name="lat"
            control={control}
            render={({ field, fieldState }) => (
              <NumberInput
                {...field}
                error={fieldState.error?.message}
                label="Широта"
                maw={350}
                w={"100%"}
                placeholder="Широта"
                decimalSeparator="."
                hideControls
                allowDecimal
                allowNegative
              />
            )}
          />
          <Controller
            name="long"
            control={control}
            render={({ field, fieldState }) => (
              <NumberInput
                {...field}
                error={fieldState.error?.message}
                label="Долгота"
                maw={350}
                w={"100%"}
                placeholder="Долгота"
                decimalSeparator="."
                allowDecimal
                allowNegative
                hideControls
              />
            )}
          />
        </Group>
        <Group>
          <Controller
            control={control}
            name="website"
            render={({ field, fieldState }) => (
              <TextInput
                maw={350}
                w="100%"
                label="Сайт"
                placeholder="Сайт"
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
          <FileForm />
        </Group>

        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <Textarea
              withAsterisk
              w={"auto"}
              label="Адрес пункта"
              {...field}
              error={fieldState.error?.message}
            />
          )}
        />
        <MaterialsSelectForm />
      </div>
    </>
  );
};
