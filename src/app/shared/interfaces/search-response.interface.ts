import { Album } from "./album.interface";
import { Pagination } from "./pagination.interface";

export interface SearchResponse {
  pagination: Pagination;
  results: Album[];
}