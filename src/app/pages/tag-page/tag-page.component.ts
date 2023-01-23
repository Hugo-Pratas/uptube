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
  processedPage = false

  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async r => {
      this.thisTag = <string>r.get('tag')
      let videos_id = <number[]>await this._service.getVideosIdbyTagName(this.thisTag)
      this.videos_data = await this._service.getVideosFromIds(videos_id)
    });
  }
}
