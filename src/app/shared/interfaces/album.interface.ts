import { AlbumImage } from "./album-image.interface";
import { Track } from "./track.interface";

export interface Album {  
  name: string;
  artist: string;
  mbid: string;
  playcount: string;
  listeners: string;
  url: string;
  image: AlbumImage[];
  tracks: Track[];
  summary: string;
}