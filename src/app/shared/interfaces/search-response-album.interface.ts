import { Album } from "./album.interface";

export interface SearchResponseAlbum {
  results: {
    albummatches: {
      album: Album[]; 
    };
  }
}
