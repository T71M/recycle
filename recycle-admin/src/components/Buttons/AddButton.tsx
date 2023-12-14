import { Button, ButtonProps, Text } from "@mantine/core";
import { Link, To } from "react-router-dom";
import { FC } from "react";
import { Icon } from "@iconify/react";

interface AddButtonProps extends ButtonProps {
  link?: To;
}

const AddButton: FC<AddButtonProps> = ({ link, ...rest }) => {
  if (link) {
    return (
      <Button
        variant={"white"}
        {...rest}
        component={Link}
        to={link}
        styles={{
          root: {
            alignItems: "center",
          },
        }}
        leftSection={<Icon icon={"ph:plus-fill"} fontSize={"1rem"} />}
      >
        <Text
          component="p"
          fz={"1erm"}
          style={{ textDecoration: "none", lineHeight: "1rem" }}
        >
          Добавить
        </Text>
      </Button>
    );
  }
  return (
    <Button
      variant={"white"}
      {...rest}
      leftSection={<Icon icon={"ph:plus-fill"} />}
    >
      <Text component="p" style={{ textDecoration: "none" }}>
        Добавить
      </Text>
    </Button>
  );
};

export default AddButton;
