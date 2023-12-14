import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FC } from "react";
import { Filters } from ".";

interface Props {
  items: Filters["filters"][number]["items"];
  name: string;
  multiply: boolean;
  value: Set<string>;
  onChange: (s: Set<string>) => void;
}

export const InputFilter: FC<Props> = ({
  items,
  name,
  value,
  onChange,
  multiply,
}) => {
  const values = Array.from(value);

  function getLabel() {
    if (!values.length) {
      return name;
    }
    if (values.length === 1) {
      const material = items.find((v) => String(v.id) === values[0])?.name;
      return material ?? name;
    }

    return `${name} ${values.length}...`;
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="max-w-[170px] w-full text-white bg-[#009B20]">
          {getLabel()}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode={multiply ? "multiple" : "single"}
        variant="flat"
        selectedKeys={value}
        onSelectionChange={onChange as never}
      >
        {items.map((v) => (
          <DropdownItem value={String(v.id)} key={String(v.id)}>
            {v.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
