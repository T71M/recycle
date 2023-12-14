export const getFileUrl = (file?: File | string | Blob | null) => {
  if (!file) return undefined;

  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  if (file instanceof Blob) {
    return URL.createObjectURL(file);
  }
  return file;
};
