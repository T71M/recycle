import { UpdateOptions } from "react-toastify";

export const ERROR_TOAST_PARAMS: UpdateOptions = {
  isLoading: false,
  autoClose: 4000,
  closeButton: true,
  type: "error",
};

export const SUCCESS_TOAST_PARAMS: UpdateOptions = {
  isLoading: false,
  autoClose: 4000,
  closeButton: true,
  type: "success",
};
