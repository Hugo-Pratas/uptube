import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {DomSanitizer} from '@angular/platform-browser';
import {faBookmark as solidBookmark} from "@fortawesome/free-solid-svg-icons";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faThumbsDown} from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp as solidThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faThumbsDown as solidThumbsDown} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition, parse} from "@fortawesome/fontawesome-svg-core";


@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})


export class VideoPageComponent implements OnInit {
  videoData: any;
  userData: any;
  id_video = -1;
  bookmark = faBookmark;
  processedPage = false;
  urlSite = ""
  sugestedVideos: any


  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(r => {
      this.id_video = parseInt(r['id_video'])
      this.getData()
    });
  }

  async getData() {
    this.urlSite = this._service.getApiRoute()
    this.videoData = await this._service.getVideoData(this.id_video)
    this.userData = await this._service.getUserData(this.videoData.channel)
    this.bookmark = this.icone_favorito
    this.sugestedVideos = await this.getSugestedVideoData()
    this.processedPage = true
  }

  getSugestedVideoData() {
    return new Promise((resolve) => {
      let data: any;
      this._service.getSugestedVideos().subscribe(d => {
        data = d;
        resolve(data);
      });
    })
  }

  toggleFavorito(id_video: number) {
    if (this.isFavourite(id_video)) {
      this._service.removeFavouriteFromLocal(id_video)
    } else {
      this._service.addFavouriteToLocal(id_video)
    }
    this.bookmark = this.icone_favorito
  }

  get icone_favorito() {
    return this.isFavourite(this.id_video) ? solidBookmark : faBookmark;
  }

  isFavourite(id_video: number): boolean {
    return this._service.getFavouritesFromLocal().includes(id_video);
  }

  marked_icon(isMarked?: boolean) {
    return isMarked ? solidThumbsUp : faThumbsUp;
  }


}


