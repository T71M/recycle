import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/constants';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export type PaginateOptions = { page: number; perPage: number };
export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

export function createPaginateOptions(
  page: number,
  perPage: number,
): PaginateOptions {
  return {
    page: Math.max(1, page),
    perPage: Math.max(1, perPage),
  };
}

interface PaginateResponseParams<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

export function paginateResponse<T>({
  data,
  total,
  limit,
  page,
}: PaginateResponseParams<T>): PaginatedResult<T> {
  const lastPage = Math.ceil(total / limit);

  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;

  return {
    data: data,
    meta: {
      total: +total,
      currentPage: +page,
      next: nextPage ? +nextPage : nextPage,
      prev: prevPage ? +prevPage : prevPage,
      perPage: +limit,
      lastPage: +lastPage,
    },
  };
}

export function getPaginateParams(
  page: number = DEFAULT_PAGE,
  perPage: number = DEFAULT_PAGE_SIZE,
) {
  return { skip: (+page - 1) * +perPage, take: +perPage };
}
