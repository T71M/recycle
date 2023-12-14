import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { api } from "../../../main";
import { toast } from "react-toastify";

export const usePartnerUpdate = () => {
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (data: Partner) => api.partners.updatePartner(data),
  });
  const toastId = useRef<ToastId>(null);
  const queryClient = useQueryClient();

  const handleUpdate = useCallback(
    async (data: Partner) => {
      toastId.current = toast.loading("Обновление...");
      try {
        if (!data.materials.length) {
          return toast.update(toastId.current, {
            isLoading: false,
            autoClose: 4000,
            type: "error",
            render: "Пункт должен принимать хотя бы 1 материал!",
            closeButton: true,
          });
        }
        data.materials = data.materials.map(Number);
        data.PartnerMaterials = undefined;
        data;
        await mutateAsync(data);
        await queryClient.invalidateQueries({
          queryKey: ["PARTNER", data.id],
        });
        await queryClient.invalidateQueries({
          queryKey: ["PARTNERS"],
        });
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "success",
          render: "Партнер успешно обновлен",
          closeButton: true,
        });
      } catch (error) {
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "error",
          render: "Что-то пошло не так",
          closeButton: true,
        });
      }
    },
    [mutateAsync, queryClient]
  );

  return { handleUpdate, ...rest };
};
