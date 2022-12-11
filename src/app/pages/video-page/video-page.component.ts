import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})
export class VideoPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService) { }

  data: any;
  ngOnInit(): void {
    let id_video= this.route.snapshot.params['id_video']
    this.data = this._service.getVideo(id_video);
    console.log(this.data);
  }

}
