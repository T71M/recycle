import { Icon } from "@iconify/react";
import { ActionIcon, ActionIconProps, Tooltip } from "@mantine/core";
import { FC } from "react";
import { Link, To } from "react-router-dom";

interface Props extends ActionIconProps {
  to?: To;
  iconSize?: string | number;
  state?: Record<string, unknown>;
}

export const CopyButton: FC<Props> = (_props) => {
  if (!_props.to) {
    return (
      <Tooltip label="Создать с копированием">
        <ActionIcon {..._props} onClick={(e) => e.stopPropagation()}>
          <Icon
            icon={"ph:copy-bold"}
            fontSize={_props.iconSize}
            color={"#5877ff"}
          />
        </ActionIcon>
      </Tooltip>
    );
  }
  return (
    <Tooltip label="Создать с копированием">
      <ActionIcon
        component={Link}
        {..._props}
        to={_props.to}
        onClick={(e) => e.stopPropagation()}
      >
        <Icon
          icon={"ph:copy-bold"}
          fontSize={_props.iconSize}
          color={"#5877ff"}
        />
      </ActionIcon>
    </Tooltip>
  );
};
