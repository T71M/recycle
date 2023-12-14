export const getFilename = (file: string) => {
  const name = file.split('files/')[1];
  return name ?? file;
};
