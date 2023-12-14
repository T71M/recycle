export const parseFileUrl = (url: string) => {
  return `${import.meta.env.VITE_PROD_API_PREFIX}${url}`;
};
