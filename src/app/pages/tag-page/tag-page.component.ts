import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss']
})
export class TagPageComponent implements OnInit {
  thisTag = ""
  videos_id: number[] = []
  videos_data: any[] = []

  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(r => {
      this.thisTag = r['tag']
      this._service.getVideosIdbyTag(this.thisTag).then(data => {
        // @ts-ignore
        this.videos_id = data
        for (const id of this.videos_id) {
          this._service.getVideoData(id).then(d => {
            this.videos_data.push(d)
          })
        }
      })
    });
  }

}
