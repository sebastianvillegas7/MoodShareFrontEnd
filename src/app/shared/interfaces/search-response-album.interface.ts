import { Album } from "./artist.interface";

export interface SearchResponseAlbum {
  page: number;
  results: Album[];
  total_pages: number;
  total_results: number;
}
