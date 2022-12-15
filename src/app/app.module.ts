import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {VideoPageComponent} from './pages/video-page/video-page.component';
import {TagsComponent} from './components/tags/tags.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {UserLogoComponent} from './components/user-logo/user-logo.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    VideoPageComponent,
    NavbarComponent,
    HomepageComponent,
    TagsComponent,
    UserLogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
