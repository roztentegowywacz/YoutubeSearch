import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import { SearchBoxComponent } from './youtube-search/search-box/search-box.component';
import { YoutubeSearchInjectibles } from './youtube-search/youtube-search.injectables';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultComponent } from './youtube-search/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeSearchComponent,
    SearchBoxComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [YoutubeSearchInjectibles],
  bootstrap: [AppComponent]
})
export class AppModule { }
