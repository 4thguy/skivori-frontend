export interface Paged<T> {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
}
