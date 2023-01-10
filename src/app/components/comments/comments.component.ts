import {Component, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {Channel} from "../../model/channel";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  channels = [] as Channel[];
  apiRoute = this._service.getApiRoute()

  constructor(private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this._service.getSugestedChannels().subscribe(d => {
      this.channels = <Channel[]>d
      this.channels = this.channels.splice(0, 1)
    })
  }
}
