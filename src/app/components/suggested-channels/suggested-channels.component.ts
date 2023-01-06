import {Component, Input, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {Channel} from "../../model/channel";


@Component({
  selector: 'app-suggested-channels',
  templateUrl: './suggested-channels.html',
  styleUrls: ['./suggested-channels.scss']
})


export class SuggestedChannelsComponent implements OnInit {

  channels = [] as Channel[];
  apiRoute = this._service.getApiRoute()

  constructor(private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this._service.getSugestedChannels().subscribe(d => {
      this.channels = <Channel[]>d
      this.channels = this.channels.splice(0,4)
    })
  }
}
