import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../main";
import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { SUCCESS_TOAST_PARAMS } from "../../../api/configs/toastsParams";

export const usePartnerRecover = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, ...rest } = useMutation({
    mutationFn: (id: PartnerRequest["id"]) => api.partners.recover(id),
  });
  const toastId = useRef<ToastId>(null);

  const handleRecover = useCallback(
    async (id: PartnerRequest["id"]) => {
      try {
        toastId.current = toast.loading("Восстановление...");
        await mutateAsync(id);
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["PARTNERS"] }),
          queryClient.invalidateQueries({ queryKey: ["PARTNER", id] }),
        ]);
        toast.update(toastId.current, {
          ...SUCCESS_TOAST_PARAMS,
          render: "Партнер успешно восстановлена",
        });
      } catch (error) {}
    },
    [mutateAsync]
  );

  return { handleRecover, isLoading: isPending, ...rest };
};
