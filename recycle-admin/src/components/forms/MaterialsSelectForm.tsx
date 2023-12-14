import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useMaterials } from "../../api/hooks/useMaterials";
import { MultiSelect } from "@mantine/core";

export const MaterialsSelectForm: FC = () => {
  const { materials } = useMaterials();
  const { watch, setValue } = useFormContext<Partner>();

  const selectedMaterials = watch("materials") ?? [];

  return (
    <>
      <MultiSelect
        placeholder="Материалы"
        label="Материалы"
        w="100%"
        data={materials.map((m) => ({ value: String(m.id), label: m.name }))}
        value={selectedMaterials.map(String)}
        onChange={(v) => {
          setValue(
            "materials",
            v.map(Number).filter((m) => !Number.isNaN(m))
          );
        }}
      />
    </>
  );
};
