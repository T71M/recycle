import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { api } from "../../../main";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCreatePartner = () => {
  const { mutateAsync, isPending, ...rest } = useMutation({
    mutationFn: (data: Partner) => api.partners.createPartner(data),
  });
  const toastId = useRef<ToastId>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleCreate = useCallback(
    async (data: Partner, requestId?: number) => {
      toastId.current = toast.loading("Создание...");
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
        await mutateAsync(data);
        if (requestId) {
          await api.requests.accept(requestId);
        }
        await queryClient.invalidateQueries({ queryKey: ["PARTNERS"] });
        await queryClient.invalidateQueries({ queryKey: ["REQUESTS"] });
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "success",
          render: "Партнер успешно добавлен",
          closeButton: true,
        });
        navigate("/partners");
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
    [mutateAsync, queryClient, navigate]
  );

  return { handleCreate, isLoading: isPending, ...rest };
};
