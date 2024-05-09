import { ArtistImage } from "./artist-image.interface";

export interface Artist {  
  name: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  images: ArtistImage[];  
}
