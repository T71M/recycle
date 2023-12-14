import { Icon } from "@iconify/react";
import { Group, FileInput, ActionIcon, Image } from "@mantine/core";
import { FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { canUsePhoto } from "../../utils/canUsePhoto";
import { getFileUrl } from "../../utils/getFileUrl";
import FsLightbox from "fslightbox-react";
import { parseFileUrl } from "../../utils/parseFileUrl";

export const FileForm: FC = () => {
  const [toggler, setToggler] = useState(false);
  const { control, watch, setValue } = useFormContext<Partner>();
  const file = watch("image");

  const onDelete = () => {
    setValue("image", "");
  };

  if (typeof file === "string" && file !== "") {
    return (
      <Group mt={"1rem"}>
        <div>
          <Image
            src={parseFileUrl(file)}
            width={100}
            height={100}
            w={100}
            style={{ cursor: "pointer" }}
          />
        </div>

        <ActionIcon>
          <Icon icon={"ph:trash-fill"} color="red" onClick={() => onDelete()} />
        </ActionIcon>
      </Group>
    );
  }

  return (
    <Group maw={350} w="100%" align="center">
      <Controller
        control={control}
        name="image"
        render={({ field, fieldState }) => (
          <FileInput
            maw={!!field.value ? 250 : 350}
            w={"100%"}
            label="Картинка"
            placeholder="Картинка"
            {...field}
            value={
              typeof field.value === "string" ? ({} as never) : field.value
            }
            onChange={(v) => {
              if (!canUsePhoto(v)) {
                return;
              }
              field.onChange(v);
            }}
            error={fieldState.error?.message}
          />
        )}
      />
      {file && (
        <>
          <ActionIcon mt={"1.25rem"} onClick={() => setToggler((v) => !v)}>
            <Icon icon={"ph:eye-light"} fontSize={"1.25rem"} />
          </ActionIcon>
          <ActionIcon variant="light" mt={"1.25rem"}>
            <Icon
              icon={"ph:trash-fill"}
              color="red"
              onClick={() => onDelete()}
            />
          </ActionIcon>
        </>
      )}
      <FsLightbox
        toggler={toggler}
        sources={[
          typeof file === "string"
            ? parseFileUrl(file)
            : getFileUrl(file) ?? "",
        ]}
        types={["image"]}
        exitFullscreenOnClose
        key={1}
      />
    </Group>
  );
};
