import { Track } from "./track.interface";

export interface Artist {
  id: number;
  name?: string;
  realname?: string;
  profile?: string;
  urls?: string[];
  members?: Artist[];
  group?: Artist;
  releases?: Track[]|Artist[];
  type: string;
  master_id: number | null;
  master_url: string | null;
  uri: string;
  thumb: string;
  cover_image: string;
  resource_url: string;
}
