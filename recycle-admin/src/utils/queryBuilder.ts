import queryString from "query-string";
import { ITEMS_PER_PAGE_DEFAULT } from "../api/configs/constansts";

const queryBuilder = (url: string) => {
  const baseUrlPrefix: string = import.meta.env.VITE_DEV_API_PREFIX;

  const query = baseUrlPrefix + url;

  const addPaginationParams = <T extends BasePaginationParams>({
    perPage = ITEMS_PER_PAGE_DEFAULT,
    ...rest
  }: T) => {
    const qs = queryString.stringify(
      { ...rest, perPage },
      { skipEmptyString: true, skipNull: true }
    );

    return `${query}?${qs}`;
  };

  const addCustomParams = <T extends object>(params: T) => {
    const qs = queryString.stringify(
      { ...params },
      { skipEmptyString: true, skipNull: true }
    );

    return `${query}?${qs}`;
  };

  return Object.assign(query, { addPaginationParams, addCustomParams });
};

export default queryBuilder;
