import {
  ActionIcon,
  ActionIconProps,
  Button,
  Group,
  Modal,
  Text,
  Tooltip,
} from "@mantine/core";
import { FC, useState } from "react";
import { Icon } from "@iconify/react";

interface DeleteButtonProps extends ActionIconProps {
  onDelete?: () => void;
  iconSize?: string | number;
  confirmModalLabel: React.ReactNode;
  confirmRequired: boolean;
  tooltipLabel?: React.ReactNode;
  variant?: "delete" | "recovery";
}

const DeleteButton: FC<DeleteButtonProps> = ({
  onDelete = () => {},
  iconSize = "1rem",
  confirmRequired,
  confirmModalLabel,
  tooltipLabel,
  variant = "delete",
  ...rest
}) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const tooltip = variant === "delete" ? "Удалить" : "Восстановить";
  const onDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (confirmRequired) {
      return setConfirmModal(true);
    }

    return onDelete();
  };

  const onConfirm = () => {
    onDelete();
    setConfirmModal(false);
  };

  return (
    <>
      <Tooltip label={tooltipLabel ?? tooltip}>
        <ActionIcon
          {...rest}
          color={variant === "delete" ? "red" : "brand"}
          onClick={onDeleteClick}
        >
          <Icon
            icon={variant === "delete" ? "clarity:trash-line" : "mdi:recycle"}
            fontSize={iconSize}
          />
        </ActionIcon>
      </Tooltip>
      {confirmRequired && (
        <Modal
          centered
          withCloseButton={false}
          opened={confirmModal}
          maw={"100%"}
          px={"1rem"}
          py={"0.5rem"}
          onClose={() => setConfirmModal(false)}
        >
          <Text
            fw={700}
            fz={"1.5rem"}
            ta="center"
            style={{ lineHeight: "1.8rem" }}
          >
            {confirmModalLabel ?? "Вы уверены?"}
          </Text>
          <Group justify="center" mt={"1rem"}>
            <Button
              color="brand"
              onClick={(e) => {
                e.stopPropagation();
                setConfirmModal(false);
              }}
            >
              Отменить
            </Button>
            <Button
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                onConfirm();
              }}
            >
              {variant === "recovery" ? "Восстановить" : "Удалить"}
            </Button>
          </Group>
        </Modal>
      )}
    </>
  );
};

export default DeleteButton;
