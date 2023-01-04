import {Component, Input, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-suggested-channels',
  templateUrl: './suggested-channels.html',
  styleUrls: ['./suggested-channels.scss']
})


export class SuggestedChannelsComponent implements OnInit {

  channels: any
  apiRoute = this._service.getApiRoute()

  constructor(private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this._service.getSugestedChannels().subscribe(d => {
      // @ts-ignore
      this.channels = d.splice(0,4)
      //this.channels.length = 2
      console.log(this.channels)
    })
  }
}
