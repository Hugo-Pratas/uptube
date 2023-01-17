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
import {VideoCardComponent} from './components/video-card/video-card.component';
import {HttpClientModule} from '@angular/common/http';
import {TagPageComponent} from './pages/tag-page/tag-page.component';
import {ThematicsPageComponent} from './pages/thematics-page/thematics-page.component';
import {SuggestedChannelsComponent} from "./components/suggested-channels/suggested-channels.component";
import {SuggestedThematicsComponent} from './components/suggested-thematics/suggested-thematics.component';
import {ThematicPageComponent} from './pages/thematic-page/thematic-page.component';
import {ChannelComponent} from "./pages/channel/channel.component";
import { AllChannelsComponent } from './pages/all-channels/all-channels.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPageComponent,
    NavbarComponent,
    HomepageComponent,
    TagsComponent,
    UserLogoComponent,
    VideoCardComponent,
    TagPageComponent,
    ThematicsPageComponent,
    SuggestedThematicsComponent,
    SuggestedChannelsComponent,
    ThematicPageComponent,
    ChannelComponent,
    AllChannelsComponent
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
