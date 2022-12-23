import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {VideoPageComponent} from "./pages/video-page/video-page.component";
import {TagPageComponent} from "./pages/tag-page/tag-page.component";


const routes: Routes = [
  {path: 'homepage', component: HomepageComponent},
  {path: '', redirectTo: 'homepage', pathMatch: 'full'},
  {path: 'video/:id_video', component: VideoPageComponent},
  {path: ':tag', component: TagPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
