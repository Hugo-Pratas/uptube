import {Component, OnInit} from '@angular/core';
import {Video} from 'src/app/model/video';
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  videos = [] as Video[];
  processedPage = false

  constructor(private _service: UpTubeServiceService) {
  }

  async ngOnInit(): Promise<void> {
    this.videos = await this._service.getVideos()
    this.processedPage = true
  }
}
