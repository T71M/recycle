interface Meta {
  total: number;
  currentPage: number;
  next: number;
  prev: number;
  perPage: number;
  lastPage: number;
}

interface MetaResponse<T> {
  data: T[];
  meta: Meta;
}
