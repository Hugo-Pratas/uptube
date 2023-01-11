import {Component, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {ActivatedRoute} from "@angular/router";
import {Video} from 'src/app/model/video';

@Component({
  selector: 'app-thematic-page',
  templateUrl: './thematic-page.component.html',
  styleUrls: ['./thematic-page.component.scss']
})
export class ThematicPageComponent implements OnInit {
  videos = [] as Video[]

  constructor(private _service: UpTubeServiceService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(d => {
      let routeData = d.get('id_thematic')
      if (routeData === null) {
        throw new Error("params Value is NULL")
      }
      let id_thematic = parseInt(routeData)
      this.getVideosFromServices(id_thematic).then(videos => {
        this.videos = videos
      })
    })
  }

  async getVideosFromServices(id_thematic: number): Promise<Video[]> {
    let TagsId = await this._service.getThematicTagsById(id_thematic)
    let videosId = [] as any[]
    for (const tag of TagsId) {
      let videosIdArr = await this._service.getVideosIdbyTagId(tag)
      videosId = videosId.concat(videosIdArr)
    }
    videosId = [...new Set(videosId)]  //remover repetidos
    return await this._service.getVideosFromIds(videosId)
  }

}
