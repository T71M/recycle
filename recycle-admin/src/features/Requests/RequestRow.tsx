import { FC } from "react";
import { RecycleTable } from "../../components/Table/RecycleTable";
import { Badge, Group } from "@mantine/core";
import { useRequestDelete } from "./hooks/useRequestDelete";
import { useRequestRecover } from "./hooks/useRequestRecover";

interface Props {
  request: PartnerRequest;
}

export const RequestRow: FC<Props> = ({ request }) => {
  const { handleDelete, isLoading: isDeleting } = useRequestDelete();
  const { handleRecover, isLoading: isRecovering } = useRequestRecover();
  return (
    <RecycleTable.TableRow>
      <RecycleTable.TableData>{request.id}</RecycleTable.TableData>
      <RecycleTable.TableData>{request.inn}</RecycleTable.TableData>
      <RecycleTable.TableData>{request.contact_person}</RecycleTable.TableData>
      <RecycleTable.TableData>{request.contact_phone}</RecycleTable.TableData>
      <RecycleTable.TableData>
        <Badge
          color={
            request.is_accept ? "brand" : request.is_active ? "brand" : "red"
          }
        >
          {request.is_accept
            ? "Принята"
            : request.is_active
            ? "Активна"
            : "Не активна"}
        </Badge>
      </RecycleTable.TableData>
      <RecycleTable.TableData>
        {!request.is_accept && (
          <Group>
            <RecycleTable.EditButton
              link={`/requests/${request.id}`}
              variant="eye"
            />
            <RecycleTable.EditButton
              link={`/requests/${request.id}/create`}
              tooltip="Подтвердить заявку"
              variant="check"
            />
            <RecycleTable.DeleteButton
              onDelete={() => {
                request.is_active
                  ? handleDelete(request.id)
                  : handleRecover(request.id);
              }}
              confirmModalLabel={
                request.is_active
                  ? "Вы уверены, что хотите удалить этy заявку?"
                  : "Вы уверены, что хотите восстановить этy заявку?"
              }
              confirmRequired
              loading={isDeleting || isRecovering}
              variant={request.is_active ? "delete" : "recovery"}
            />
          </Group>
        )}
      </RecycleTable.TableData>
    </RecycleTable.TableRow>
  );
};
