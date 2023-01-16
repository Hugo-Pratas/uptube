import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {Video} from "../../model/video";
import {Channel} from "../../model/channel";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  channel = {} as Channel;
  videos = [] as Video[];
  id_channel = -1;
  processedPage = false;

  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(r => {
      this.id_channel = parseInt(r['id_channel'])
      this.getData(this.id_channel)
    });
  }

  async getData(id_channel: number) {
    let channels = await this._service.getChannelbyId(id_channel)
    this.channel = channels[0]
    let channel_ids = await this._service.getVideosIdsFromChannel(id_channel)
    this.videos = await this._service.getVideosFromIds(channel_ids)
    this.processedPage = true
  }
}
