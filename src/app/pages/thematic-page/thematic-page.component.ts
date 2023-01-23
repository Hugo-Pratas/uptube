import {Component, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {ActivatedRoute} from "@angular/router";
import {Video} from 'src/app/model/video';
import {iThematic} from "../../model/thematics";

@Component({
  selector: 'app-thematic-page',
  templateUrl: './thematic-page.component.html',
  styleUrls: ['./thematic-page.component.scss']
})
export class ThematicPageComponent implements OnInit {
  videos = [] as Video[]
  thematic = {} as iThematic
  processedPage = false

  constructor(private _service: UpTubeServiceService, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async d => {
      let routeData = <string>d.get('id_thematic')
      let id_thematic = parseInt(routeData)
      this.thematic = await this._service.getThematicsById(id_thematic)
      let TagsId = await this._service.getThematicTagsById(id_thematic) //get TAGS
      let videosId = [] as number[]
      for (const tag of TagsId) {
        let videosIdArr = await this._service.getVideosIdbyTagId(tag)  //Get id_videos
        videosId = videosId.concat(videosIdArr)
      }
      videosId = [...new Set(videosId)]  //remove repeating
      this.videos = await this._service.getVideosFromIds(videosId) //get all videos needed
      this.processedPage = true
    })
  }
}
