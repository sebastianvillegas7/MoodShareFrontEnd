import { Pagination } from './pagination.interface';

export interface SearchResponse<T> {
  pagination: Pagination;
  results: T[];
}
