import { Component, OnInit } from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  user: any;
  data: any;
  id!: number;

  constructor(private _service: UpTubeServiceService) { }

  ngOnInit(): void {
    this.user = this._service.getUser(this.data.user_id)
    console.log(this.user)
  }

}
