import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {VideoPageComponent} from "./pages/video-page/video-page.component";
import {TagPageComponent} from "./pages/tag-page/tag-page.component";
import {ThematicsPageComponent} from "./pages/thematics-page/thematics-page.component";


const routes: Routes = [
  {path: '', redirectTo: 'homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'video/:id_video', component: VideoPageComponent},
  {path: 'thematics', component: ThematicsPageComponent},
  {path: 'tags/:tag', component: TagPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
