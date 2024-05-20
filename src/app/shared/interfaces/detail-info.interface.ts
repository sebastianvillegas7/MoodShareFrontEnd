import { Artist } from "./artist.interface";
import { Track } from "./track.interface";

interface DetailInfo {
  id: number;
  main_release: number;
  most_recent_release: number;
  resource_url: string;
  uri: string;
  versions_url: string;
  main_release_url: string;
  most_recent_release_url: string;
  num_for_sale: number;
  lowest_price: number;
  image: string; // Solo una imagen
  genres: string[];
  styles: string[];
  year: number;
  tracklist: Track[];
  artists: Artist[];
  title: string;
  data_quality: string;
}
