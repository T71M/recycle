export const setFormData = <T extends Object>(
  values: T,
  forceSetEmptyString?: boolean
) => {
  const fd = new FormData();
  Object.keys(values).forEach((key) => {
    const k = key as keyof typeof values;
    const value = values[k];
    if (Array.isArray(value)) {
      value.map((v) => {
        fd.append(String(k), v);
      });
    } else if (value instanceof File) {
      fd.append(String(k), value);
    } else if (value instanceof Blob) {
      const file = new File([value], "photo.png", { type: "image/png" });
      fd.append(String(k), file);
    } else if (typeof value === "object") {
      fd.append(String(k), JSON.stringify(value));
      return;
    } else if (!!value) {
      const stringified = String(value);
      fd.append(String(k), stringified);
    } else if (forceSetEmptyString && value === "") {
      const stringified = String(value);
      fd.append(String(k), stringified);
    }
  });
  return fd;
};
