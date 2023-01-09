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

  constructor(private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this._service.getVideos().subscribe(d => {
      this.videos = <Video[]>d
      for (const video of this.videos) {
        video.id_number = parseInt(video.id) //https://gifdb.com/gif/rage-comics-table-flip-qitpumendrh5b9sl.html
      }
    })
  }
}
