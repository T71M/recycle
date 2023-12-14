import { number } from "yup";

export const coordinateSchema = number()
  .typeError("Обязательное поле!")
  .required("Обязательное поле")
  .min(-90, "Значение должно быть больше или равно -90")
  .max(90, "Значение должно быть меньше или равно 90")
  .test(
    "decimalPlaces",
    "Координата должна иметь не более 6 знаков после запятой",
    (value) => {
      if (!value) return false;
      if (isNaN(value)) {
        return false;
      }
      const decimalPlaces = value.toString().split(".")[1]?.length || 0;
      return decimalPlaces <= 6;
    }
  );
