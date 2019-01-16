import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from './search-result.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const YOUTUBE_API_KEY = 'AIzaSyC8_5CSmJy8jSmp9yCW7j2JoqUx2pPgQi4';
export const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

@Injectable()
export class YoutubeSearchService {

  constructor(
    private http: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string
  ) { }

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=4`
    ].join('&');
    const queryUrl = `${this.apiUrl}?${params}`;

    return this.http.get(queryUrl)
      .pipe(map(response => {
        console.log('response: ', response);
        return <any>response['items'].map(item => {
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thubnailUrl: item.snippet.thumbnails.high.url
          });
        });
      }));
  }
}
