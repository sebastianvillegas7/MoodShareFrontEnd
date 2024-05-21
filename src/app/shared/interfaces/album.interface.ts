import { Track } from "./track.interface";
import { Artist } from './artist.interface';

export interface Album {
  id: number;
  title: string;
  artist?: Artist;
  country: string;
  year: string;
  format: string[];
  label: string[];
  genre: string[];
  style: string[];
  master_id: number;
  master_url: string;
  uri: string;
  thumb: string;
  cover_image: string;
  resource_url: string;
  tracklist?: Track[];
}
