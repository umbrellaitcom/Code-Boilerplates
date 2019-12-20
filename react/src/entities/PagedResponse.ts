export interface PagedResponse<E> {
  items: E[];
  pagination: {
    page: number;
    pageSize: number;
    rowCount: number;
    pageCount: number;
  };
}
