"use client";

import api from "@/api/appService";
import { partnerRequestSchema } from "@/api/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@nextui-org/react";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";

export const BecomePartnerForm: FC = () => {
  const form = useForm<PartnerRequest>({
    resolver: yupResolver(partnerRequestSchema),
  });

  const handleSubmit = async (values: PartnerRequest) => {
    try {
      await api.requests.create(values);

      form.reset({
        contact_person: "",
        contact_phone: "",
        inn: "",
      });
      toast.success("Заявка успешно отправлена, ожидайте ответа оператора", {
        closeButton: true,
        autoClose: false,
      });
    } catch (error) {
      toast.error("Что-то пошло не так. Попробуйте, пожалуйста, позже");
    }
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="flex justify-between px-[5%] mt-[2rem] md:flex-row flex-col items-center gap-8">
        <Controller
          control={form.control}
          name="inn"
          render={({ field, fieldState }) => (
            <Input
              className="max-w-[250px] w-full"
              {...field}
              errorMessage={fieldState.error?.message}
              label="ИНН организации"
              variant="bordered"
              color="primary"
              labelPlacement="outside"
              placeholder="ИНН"
              classNames={{
                label: "text-[1rem] font-medium",
                errorMessage: "absolute",
              }}
            />
          )}
        />
        <Controller
          control={form.control}
          name="contact_person"
          render={({ field, fieldState }) => (
            <Input
              className="max-w-[250px] w-full"
              {...field}
              errorMessage={fieldState.error?.message}
              label="Как к вам обращаться?"
              variant="bordered"
              color="primary"
              labelPlacement="outside"
              placeholder="Имя"
              classNames={{
                label: "text-[1rem] font-medium",
                errorMessage: "absolute",
              }}
            />
          )}
        />
        <Controller
          name="contact_phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <PatternFormat
              format="+# (###) ### ## ##"
              customInput={Input}
              autoFocus
              color="primary"
              variant={"bordered"}
              labelPlacement="outside"
              placeholder="Телефон"
              label={"Телефон"}
              className="max-w-[250px] w-full"
              {...field}
              errorMessage={fieldState.error?.message}
              classNames={{
                label: "text-[1rem] font-medium",
                errorMessage: "absolute",
              }}
            />
          )}
        />
      </div>
      <div className="flex justify-center mt-[5%]">
        <Button
          type="submit"
          variant="shadow"
          className="w-[250px] text-8 font-semibold text-white bg-red-600"
        >
          Оставить заявку
        </Button>
      </div>
    </form>
  );
};
