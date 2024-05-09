import { Track } from "./artist.interface";

export interface SearchResponseSong {
  page: number;
  results: Track[];
  total_pages: number;
  total_results: number;
}
