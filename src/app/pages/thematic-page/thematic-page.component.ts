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

  async ngOnInit() {
    this.route.paramMap.subscribe(d => {
      let routeData = d.get('id_thematic')
      if (routeData === null) {
        throw new Error("params Value is NULL")
      }
      let id_thematic = parseInt(routeData)
      this.getData(id_thematic)
    })
  }

  async getData(id_thematic: number) {
    this.thematic = await this._service.getThematicsById(id_thematic)
    let TagsId = await this._service.getThematicTagsById(id_thematic)
    let videosId = [] as number[]
    for (const tag of TagsId) {
      let videosIdArr = await this._service.getVideosIdbyTagId(tag)
      videosId = videosId.concat(videosIdArr)
    }
    videosId = [...new Set(videosId)]  //remover repetidos
    this.videos = await this._service.getVideosFromIds(videosId)
    this.processedPage = true

  }

}
