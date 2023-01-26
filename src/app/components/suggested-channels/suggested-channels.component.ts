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
  allChannels = [] as Channel[];
  apiRoute = this._service.getApiRoute()
  showText: string = '';
  processedPage = false

  constructor(private _service: UpTubeServiceService) {
  }

  async ngOnInit(): Promise<void> {
    this.allChannels = await this._service.getSugestedChannels()
    let spliceChannels = this.allChannels.slice()
    this.channels = spliceChannels.splice(0, 3)
    this.showText = 'MOSTRAR MAIS'
    this.processedPage = true
  }

  showMore() {
    if (this.showText == 'MOSTRAR MAIS') {
      let spliceChannels = this.allChannels.slice()
      this.channels = spliceChannels.splice(0, 6)
      this.showText = 'MOSTRAR MENOS'
    } else {
      this.showLess()
    }
  }

  showLess() {
    let spliceChannels = this.allChannels.slice()
    this.channels = spliceChannels.splice(0, 3)
    this.showText = 'MOSTRAR MAIS'
  }
}
