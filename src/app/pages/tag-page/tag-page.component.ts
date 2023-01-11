import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {Video} from "../../model/video";

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss']
})
export class TagPageComponent implements OnInit {
  thisTag = ""
  videos_data: Video[] = []

  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(r => {
      this.thisTag = <string>r.get('tag')
      this.getVideosFromTag()
    });
  }

  async getVideosFromTag() {
    let videos_id = <number[]>await this._service.getVideosIdbyTagName(this.thisTag)
    for (const id of videos_id) {
      this.videos_data.push(<Video>await this._service.getVideoData(id))
    }
  }

}
