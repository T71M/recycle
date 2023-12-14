import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../main";
import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { SUCCESS_TOAST_PARAMS } from "../../../api/configs/toastsParams";

export const useRequestDelete = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, ...rest } = useMutation({
    mutationFn: (id: PartnerRequest["id"]) => api.requests.delete(id),
  });
  const toastId = useRef<ToastId>(null);

  const handleDelete = useCallback(
    async (id: PartnerRequest["id"]) => {
      try {
        toastId.current = toast.loading("Удаление...");
        await mutateAsync(id);
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["REQUESTS"] }),
          queryClient.invalidateQueries({ queryKey: ["REQUESTS", id] }),
        ]);
        toast.update(toastId.current, {
          ...SUCCESS_TOAST_PARAMS,
          render: "Запрос успешно удален",
        });
      } catch (error) {}
    },
    [mutateAsync]
  );

  return { handleDelete, isLoading: isPending, ...rest };
};
