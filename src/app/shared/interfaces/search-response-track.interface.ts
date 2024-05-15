import { Track } from "./track.interface";

export interface SearchResponseTrack {
  results: {
    trackmatches: {
      track: Track[];
    };
  }
}
