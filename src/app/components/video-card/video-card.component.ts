import {Component, Input, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {faShareAlt} from "@fortawesome/free-solid-svg-icons";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  user: any;
  apiRoute = ""
  @Input() video_data: any;
  processPage = false
  faShareSquare=faShareAlt
  bookmark=faBookmark


  constructor(private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this.apiRoute = this._service.getApiRoute()
    this._service.getUser(this.video_data.channel).subscribe(d => {
      this.user = d
      this.user = this.user[0] //api retorna array...
      this.bookmark=this._service.icone_favorito(parseInt(this.video_data.id))
      this.processPage = true
    })
  }

  toggleFavorito(id_video: number) {
    this._service.toggleFavorito(id_video)
    this.bookmark = this._service.icone_favorito(id_video)
  }

  myFunction() {
    var popup = document.getElementById(this.video_data.id);
    navigator.clipboard.writeText(document.URL.replace("homepage", "video/") + this.video_data.id);
    // @ts-ignore
    popup.classList.toggle("show");
  }

}
