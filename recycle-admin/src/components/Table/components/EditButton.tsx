import { Icon } from "@iconify/react/dist/iconify.js";
import { ActionIcon, ActionIconProps, Tooltip } from "@mantine/core";
import { FC } from "react";
import { Link, To } from "react-router-dom";

interface EditButtonProps extends ActionIconProps {
  iconSize?: string | number;
  link?: To;
  variant?: "default" | "eye" | "check";
  tooltip?: React.ReactNode;
}

function getIcon(variant: EditButtonProps["variant"] = "default") {
  switch (variant) {
    case "default":
      return "bxs:edit";
    case "eye":
      return "mdi:eye";
    case "check":
      return "mdi:check-bold";
  }
}

const EditButton: FC<EditButtonProps> = ({
  iconSize = "1rem",
  link,
  variant = "default",
  tooltip,
  ...rest
}) => {
  const label = variant === "default" ? "Редактировать" : "Просмотреть";
  if (link) {
    return (
      <Tooltip label={tooltip ?? label}>
        <ActionIcon
          {...rest}
          component={Link}
          to={link}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon icon={getIcon(variant)} fontSize={iconSize} color={"#97ce4b"} />
        </ActionIcon>
      </Tooltip>
    );
  }
  return (
    <Tooltip label={tooltip ?? label}>
      <ActionIcon {...rest}>
        <Icon icon={"bxs:edit"} fontSize={iconSize} color={"#97ce4b"} />
      </ActionIcon>
    </Tooltip>
  );
};

export default EditButton;
