import { Component, OnInit } from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {Channel} from "../../model/channel";


@Component({
  selector: 'app-all-channels',
  templateUrl: './all-channels.component.html',
  styleUrls: ['./all-channels.component.scss']
})
export class AllChannelsComponent implements OnInit {
  channels= [] as Channel[];
  processedPage = false;

  id_channel=-1;
  constructor(private _service: UpTubeServiceService) {
  }
    async ngOnInit(): Promise<void> {
      this.channels = await this._service.getChannels()
      this.processedPage = true
    }
  toggleFavoritochannel(id_channel: number) {
    this._service.toggleFavorito(id_channel)
    console.log(id_channel)

  }


}
