import { Track } from "./track.interface";

export interface SearchResponseTrack {
  trackmatches: {
    track: Track[]; 
  };
}
