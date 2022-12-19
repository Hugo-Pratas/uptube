import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import {VideoPageComponent} from "./pages/video-page/video-page.component";


const routes: Routes = [
  {path: 'homepage', component: HomepageComponent},
  {path: '', redirectTo: '/video/14', pathMatch: 'full'},
  {path: 'video/:id_video', component: VideoPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
