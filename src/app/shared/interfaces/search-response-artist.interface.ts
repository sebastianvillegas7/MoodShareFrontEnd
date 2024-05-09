import { Artist } from "./artist.interface";

export interface SearchResponseArtist {
  artists: {
    artist: Artist[]; 
    // '@attr': {
    //   page: string;
    //   perPage: string;
    //   totalPages: string;
    //   total: string;
    // };
  };
}
