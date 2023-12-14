"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { PatternFormat } from "react-number-format";
import api from "@/api/appService";
import { toast } from "react-toastify";
import { partnerRequestSchema } from "@/api/schemas";

interface Props {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
}

export const BecomePartnerModal: FC<Props> = ({ isOpen, onOpenChange }) => {
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
      onOpenChange(false);
      toast.success("Заявка успешно отправлена, ожидайте ответа оператора", {
        closeButton: true,
        autoClose: false,
      });
    } catch (error) {
      toast.error("Что-то пошло не так. Попробуйте, пожалуйста, позже");
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        as={"form"}
        size="xl"
        classNames={{
          backdrop: "z-[9999]",
          wrapper: "z-[99999]",
        }}
        onSubmit={form.handleSubmit(handleSubmit, (e) => console.debug(e))}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Стать партнером</ModalHeader>
              <ModalBody>
                <div className="flex">
                  <Controller
                    name="inn"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        color="primary"
                        variant={"bordered"}
                        label={"ИНН организации"}
                        {...field}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
                <div className="flex">
                  <Controller
                    name="contact_person"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        color="primary"
                        variant={"bordered"}
                        label={"Как к вам обращаться?"}
                        {...field}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                </div>

                <div className="flex gap-2">
                  <Controller
                    name="contact_phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <PatternFormat
                        format="+# (###) ### ## ##"
                        customInput={Input}
                        color="primary"
                        variant={"bordered"}
                        label={"Телефон"}
                        {...field}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                </div>

                <div className="flex justify-center mt-[0.5rem] gap-[0.5rem]">
                  <Button onClick={onClose} className="bg-black text-white">
                    Закрыть
                  </Button>
                  <Button type="submit" className="bg-red-600 text-white">
                    Оставить заявку
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
