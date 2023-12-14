import { object, string } from "yup";

export const partnerRequestSchema = object({
  contact_person: string().required("Обязательное поле!"),
  contact_phone: string()
    .required("Обязательное поле!")
    .trim()
    .length(18, "Невалидный номер телефона"),

  inn: string()
    .required("Обязательное поле!")
    .min(10, "Невалидный ИНН")
    .max(12, "Невалидный ИНН")
    .test("is-numeric", "Невалидный ИНН", function (value) {
      if (value === "") return false;
      return value.split("").every((v) => !Number.isNaN(+v));
    }),
}) as never;
