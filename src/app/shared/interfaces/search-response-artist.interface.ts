import { Artist } from "./artist.interface";

export interface SearchResponseArtist {
  results: {
    artistmatches: {
      artist: Artist[]; 
      // '@attr': {
      //   page: string;
      //   perPage: string;
      //   totalPages: string;
      //   total: string;
      // };
    };
  }
}
