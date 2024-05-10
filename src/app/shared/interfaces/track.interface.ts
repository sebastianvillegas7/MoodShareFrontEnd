import { TrackImage } from "./track-image.interface";

export interface Track {
  name: string;
  artist: string;
  url: string;
  streamable: string;
  listeners: string;
  image: TrackImage[];
  mbid: string;
}