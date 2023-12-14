import { FC } from "react";
import { RecycleTable } from "../../components/Table/RecycleTable";
import { Badge, Group } from "@mantine/core";
import { usePartnerDelete } from "./hooks/usePartnerDelete";
import { usePartnerRecover } from "./hooks/useRequestRecover";

export const PartnerRow: FC<{ partner: Partner }> = ({ partner }) => {
  const { handleDelete, isLoading: isDeleting } = usePartnerDelete();
  const { handleRecover, isLoading: isRecovering } = usePartnerRecover();

  const onAction = async () => {
    if (partner.is_active) {
      return await handleDelete(partner.id);
    }

    return await handleRecover(partner.id);
  };
  return (
    <RecycleTable.TableRow>
      <RecycleTable.TableData>{partner.name}</RecycleTable.TableData>
      <RecycleTable.TableData>{partner.inn}</RecycleTable.TableData>
      <RecycleTable.TableData>{partner.contact_person}</RecycleTable.TableData>
      <RecycleTable.TableData>{partner.contact_phone}</RecycleTable.TableData>
      <RecycleTable.TableData>
        <Badge color={partner.is_active ? "brand" : "red"}>
          {partner.is_active ? "Активен" : "Не Активен"}
        </Badge>
      </RecycleTable.TableData>
      <RecycleTable.TableData>
        <Group>
          <RecycleTable.EditButton link={`/partners/${partner.id}`} />
          <RecycleTable.DeleteButton
            onDelete={() => onAction()}
            confirmModalLabel={
              partner.is_active
                ? "Вы уверены, что хотите удалить этy заявку?"
                : "Вы уверены, что хотите восстановить этy заявку?"
            }
            confirmRequired
            loading={isDeleting || isRecovering}
            variant={partner.is_active ? "delete" : "recovery"}
          />
        </Group>
      </RecycleTable.TableData>
    </RecycleTable.TableRow>
  );
};
