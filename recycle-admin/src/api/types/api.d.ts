interface BasePaginationParams {
  page: number;
  perPage?: number;
}

interface Meta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

interface MetaResponse<T> {
  data: T[];
  meta: Meta;
}
