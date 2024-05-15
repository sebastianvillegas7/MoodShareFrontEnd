import { TrackImage } from "./track-image.interface";

export interface Track {
  name: string;
  artist: string;
  url: string;
  duration: number;
  image: TrackImage[];
  mbid: string;
}