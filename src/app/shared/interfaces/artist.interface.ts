import { Image } from "./image.interface";

export interface Movie {  
  name: string;  
  listeners: number;
  url: string;
  images: Image[];  
}
