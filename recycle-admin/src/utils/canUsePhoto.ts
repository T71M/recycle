import { toast } from "react-toastify";

export const CHAT_FILE_MAX_SIZE = 3;

export const AVATAR_FILE_EXTS = ["image/png", "image/jpg", "image/jpeg"];

function megabytesToBytes(megabytes: number): number {
  const bytesInMegabyte = 1024 * 1024;
  return megabytes * bytesInMegabyte;
}

export const canUsePhoto = (
  file?: File | null,
  size: number = CHAT_FILE_MAX_SIZE,
  extns: string[] = AVATAR_FILE_EXTS.map((v) => v.split("/")[1])
) => {
  const maxSize = megabytesToBytes(size);
  if (!file) return false;
  if (file.size > maxSize) {
    toast.error(
      file.name +
        ` - Слишком большой вес файла! Максимальный вес файла - ${size}МБ`,
      {
        autoClose: 4000,
        closeButton: true,
      }
    );
    return false;
  }

  const fileExtension = file.name.split(".").pop();
  if (!fileExtension || !extns.includes(fileExtension)) {
    toast.error(
      file.name +
        ` - неподдерживаемое расширение файла! Пожалуйста, прикрепите файл формата - ${extns.join(
          ", "
        )}`,
      {
        autoClose: 4000,
        closeButton: true,
      }
    );
    return false;
  }

  return true;
};
