import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {faThumbsDown} from "@fortawesome/free-regular-svg-icons";
import {faThumbsDown as solidThumbsDown} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {Video} from "../../model/video";
import {Channel} from "../../model/channel";
import {Subject} from 'rxjs';


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
  thumbsUp = {} as IconProp
  thumbsDown = {} as IconProp
  processedPage = false;
  getScreenWidth = window.innerWidth;
  clickSubject: Subject<any> = new Subject();
  likes = 0
  dislikes = 0


  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async r => {
      let paramsData = <string>r.get('id_video')
      this.id_video = parseInt(paramsData)
      this.bookmark = this._service.icone_favorito(this.id_video)
      this.thumbsUp = this._service.getThumbsUp(this.id_video)
      this.thumbsDown = this._service.getThumbsDown(this.id_video)
      this.videoData = await this._service.getVideo(this.id_video)
      let channels = await this._service.getChannelbyId(this.videoData.channel) //api gives me channel[] bc of relationship with videos
      this.channelData = channels[0]  //I only need channel data for this purpose
      this.sugestedVideos = await this._service.getSugestedVideos()
      this.likes = parseInt(await this._service.getLikes(this.id_video))
      this.dislikes = parseInt(await this._service.getDisLikes(this.id_video))
      this.processedPage = true
    });
  }

  toggleFavorito(id_video: number) {
    this._service.toggleFavorito(id_video)
    this.bookmark = this._service.icone_favorito(id_video)
    console.log(id_video)
  }

  postLike() {
    if (this._service.isLike(this.id_video))
      return
    if (this._service.isDislike(this.id_video))
      return
    this._service.postLike(this.id_video)
    this._service.addLikeToLocal(this.id_video)
    this.thumbsUp = this._service.getThumbsUp(this.id_video)
    this.likes++
  }

  postDislike() {
    if (this._service.isDislike(this.id_video))
      return
    if (this._service.isLike(this.id_video))
      return
    this._service.postDislike(this.id_video)
    this._service.addDislikeToLocal(this.id_video)
    this.thumbsDown = this._service.getThumbsDown(this.id_video)
    this.dislikes++
  }

  @HostListener('window:resize', ['$event']) //verificar tamanho ecrã a cada modificação
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }

  onScroll(scrollable: HTMLDivElement) {
    let scrollTop = scrollable.scrollTop;
    let scrollHeight = scrollable.scrollHeight;
    let screenHeight = window.innerHeight;

    if (scrollTop >= scrollHeight - screenHeight) {
      this.clickSubject.next(1);
    }
  }
}


