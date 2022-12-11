import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VideoPageComponent} from "./pages/video-page/video-page.component";


const routes: Routes = [
  {path: '', redirectTo: '/video/1', pathMatch: 'full'},
  {path: 'video/:id_video', component: VideoPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
