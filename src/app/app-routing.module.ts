import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {VideoPageComponent} from "./pages/video-page/video-page.component";
import {TagPageComponent} from "./pages/tag-page/tag-page.component";
import {ThematicsPageComponent} from "./pages/thematics-page/thematics-page.component";
import {ThematicPageComponent} from "./pages/thematic-page/thematic-page.component";
import {ChannelComponent} from "./pages/channel/channel.component";
import {PlaylistsPageComponent} from "./pages/playlists-page/playlists-page.component";
import {PlaylistComponent} from "./pages/playlist/playlist.component";
import {FavouritesComponent} from "./pages/favourites/favourites.component";
import {AllChannelsComponent} from "./pages/all-channels/all-channels.component";
import {SubscribedChannelsComponent} from "./pages/subscribed-channels/subscribed-channels.component";


const routes: Routes = [
  {path: '', redirectTo: 'homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'video/:id_video', component: VideoPageComponent},
  {path: 'thematics', component: ThematicsPageComponent},
  {path: 'tags/:tag', component: TagPageComponent},
  {path: 'thematic/:id_thematic', component: ThematicPageComponent},
  {path: 'channel/:id_channel', component: ChannelComponent},
  {path: 'playlists', component: PlaylistsPageComponent},
  {path: 'playlist/favourites', component: FavouritesComponent},
  {path: 'playlist/:id_playlist', component: PlaylistComponent},
  {path: 'channels', component: AllChannelsComponent },
  {path: 'subscribed', component:SubscribedChannelsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
