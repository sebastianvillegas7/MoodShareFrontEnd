export interface Artist {
  id: number;
  type: string;
  master_id: number | null;
  master_url: string | null;
  uri: string;
  title: string;
  thumb: string;
  cover_image: string;
  resource_url: string;
}
