import {Component, Input, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {faShareAlt, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faClapperboard as faClapperboardSolid} from "@fortawesome/free-solid-svg-icons";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {Video} from "../../model/video";
import {iThematic} from "../../model/thematics";
import {CardData} from 'src/app/model/card-data';
import {Channel} from "../../model/channel";
import {Playlist} from "../../model/playlist";

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  @Input() video_data = {} as Video;
  @Input() thematic = {} as iThematic
  @Input() playlist = {} as Playlist
  @Input() icons = false
  @Input() ischannelView = false
  channel = {} as Channel;
  data = {} as CardData
  sideIcon = {} as IconDefinition
  faShareSquare = faShareAlt
  bookmark = {} as IconProp
  routerLink = ""
  isVideo = false
  processPage = false

  constructor(private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    if (Object.keys(this.video_data).length !== 0)
      this.processVideoCard()
    else if (Object.keys(this.thematic).length !== 0)
      this.processThematic()
    else if (Object.keys(this.playlist).length !== 0)
      this.processPlaylist()
  }

  async processVideoCard() {
    let channelArr = await this._service.getChannelbyId(this.video_data.channel)
    this.channel = channelArr[0]
    if (this.icons)
      this.bookmark = this._service.icone_favorito(this.video_data.id_number)
    this.constructCardData(
      this.video_data.thumbnail,
      this.channel.logo,
      "/channel/" + this.channel.id,
      this.video_data.name,
      this.channel.name,
      this.video_data.date
    )
    if (this.ischannelView)
      this.data.tags = this.video_data.tags_arr
    this.isVideo = true
    this.routerLink = "/video/" + this.video_data.id
    this.processPage = true
  }

  processThematic() {
    this.constructCardData(this.thematic.thumbnail, this.thematic.logo, "/thematic/" + this.thematic.id, this.thematic.teaser, this.thematic.title, this.thematic.date)
    this.routerLink = "/thematic/" + this.thematic.id
    this.sideIcon = faClapperboardSolid
    this.processPage = true
  }

  processPlaylist() {
    this.constructCardData(this.playlist.thumbnail, this.playlist.image, "/playlist/" + this.playlist.id, this.playlist.title, this.playlist.category, this.thematic.date)
    this.routerLink = "/playlist/" + this.playlist.id
    this.sideIcon = faPlay
    this.processPage = true
  }

  constructCardData(thumbnail: string, logo: string, logo_link: string, title: string, name: string, date: string) {
    this.data.thumbnail = thumbnail
    this.data.logo = logo
    this.data.logo_link = logo_link
    this.data.title = title
    this.data.name = name
    this.data.date = date
  }

  toggleFavorito(id_video: number) {
    this._service.toggleFavorito(id_video)
    this.bookmark = this._service.icone_favorito(id_video)
  }

  CopyLink() { //needs fixing
    var popup = document.getElementById(this.video_data.id.toString());
    let siteUrl = document.URL.split("/")[2]
    navigator.clipboard.writeText(siteUrl + this.routerLink);
    // @ts-ignore
    popup.classList.toggle("show");
  }

}
