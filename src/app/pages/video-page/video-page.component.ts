import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faThumbsDown} from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp as solidThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faThumbsDown as solidThumbsDown} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {Video} from "../../model/video";
import {Channel} from "../../model/channel";


@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})


export class VideoPageComponent implements OnInit {
  videoData = {} as Video;
  sugestedVideos = [] as Video[]
  channelData = {} as Channel;
  id_video = -1;
  bookmark = {} as IconProp
  processedPage = false;


  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async r => {
      let paramsData = <string>r.get('id_video')
      this.id_video = parseInt(paramsData)
      this.bookmark = this._service.icone_favorito(this.id_video)
      this.videoData = await this._service.getVideo(this.id_video)
      let channels = await this._service.getChannelbyId(this.videoData.channel) //api gives me channel[] bc of relationship with videos
      this.channelData = channels[0]  //I only need channel data for this purpose
      this.sugestedVideos = await this._service.getSugestedVideos()
      this.processedPage = true
    });
  }

  toggleFavorito(id_video: number) {
    this._service.toggleFavorito(id_video)
    this.bookmark = this._service.icone_favorito(id_video)
  }

  marked_icon(isMarked?: boolean) {
    //needs fixing
    return isMarked ? solidThumbsUp : faThumbsUp;
  }
}


