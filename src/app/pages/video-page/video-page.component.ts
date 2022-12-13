import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})


export class VideoPageComponent implements OnInit {
  video_url: SafeUrl | undefined;
  data: any;
  user: any;

  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    let id_video = this.route.snapshot.params['id_video']
    this.data = this._service.getVideo(id_video);
    this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.video.replace("watch?v=","embed/"));
    this.user = this._service.getUser(this.data.user_id)
  }
}

