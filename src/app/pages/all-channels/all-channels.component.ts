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
  constructor(private _service: UpTubeServiceService) {
  }


    async ngOnInit(): Promise<void> {
      this.channels = await this._service.getChannels()
      this.processedPage = true
    }




}
