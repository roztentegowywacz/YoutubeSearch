import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { SearchResult } from '../search-result.model';
import { YoutubeSearchService } from '../youtube-search.service';
import { fromEvent } from 'rxjs';
import { map, debounceTime, filter, tap, switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YoutubeSearchService,
              private el: ElementRef) { }

  ngOnInit(): void {
    const obs = fromEvent(this.el.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        filter((text: string) => text.length > 2),
        debounceTime(500),
        tap(() => this.loading.emit(true)),
        map((query: string) => this.youtube.search(query)),
        switchAll()
      );

    obs.subscribe((results: SearchResult[]) => {
      this.loading.emit(false);
      this.results.emit(results);
    },
    (err: any) => {
      console.log(err);
      this.loading.emit(false);
    },
    () => {
      this.loading.emit(false);
    });
  }

}
