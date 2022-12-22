import { Component, OnInit } from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  videos!: number[];

  constructor(private _service: UpTubeServiceService) { }

  ngOnInit(): void {
    this.videos = this._service.getIdVideos()
    console.log(this.videos)
  }

}
