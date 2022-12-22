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

  logo = "https://dev-testeuptube.pantheonsite.io/sites/default/files/2022-12/logo.png"


  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(r => {
      this.id_video = parseInt(r['id_video'])
      this.getData()
    });
  }

  async getData() {
    this.videoData = await this.getVideoData(this.id_video)
    this.userData = await this.getUserData(this.videoData.channel)
    this.bookmark = this.icone_favorito
    this.processedPage = true
  }

  getVideoData(id_video: number) {
    return new Promise((resolve) => {
      let data: any;
      this._service.getVideo(id_video).subscribe(d => {
        data = d;
        data = data[0]; //api retorna array
        data.tags = data.tags.split(",").map(Number) //as tags vêm em string da api....
        data.url = this.sanitizer.bypassSecurityTrustResourceUrl(data.url.replace("watch?v=", "embed/"));
        resolve(data);
      });
    })
  }

  getUserData(id_user: number) {
    return new Promise((resolve) => {
      let user: any
      user = this._service.getUser(id_user).subscribe(d => {
        user = d;
        user = user[0]
        resolve(user);
      })
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


