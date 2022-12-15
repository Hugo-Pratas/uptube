import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {faFlag} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faThumbsDown} from "@fortawesome/free-regular-svg-icons";


@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})


export class VideoPageComponent implements OnInit {
  video_url: SafeUrl | undefined;
  data: any;
  user: any;
  flag = faFlag;
  thumbsUp = faThumbsUp
  thumbsDown = faThumbsDown

  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(q => {
      let id_video = q['id_video']
      this.data = this._service.getVideo(id_video);
      this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.video.replace("watch?v=", "embed/"));
      this.user = this._service.getUser(this.data.user_id)
    });
  }

  report(id: number) {
    console.log("carreguei", id)
  }
}

