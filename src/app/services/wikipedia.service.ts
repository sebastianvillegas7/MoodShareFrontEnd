import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  constructor(private http: HttpClient) { }

  getArtistImage(mbid: string) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&formatversion=2&piprop=original&titles=${mbid}`;
    return this.http.get(url);
  }
}