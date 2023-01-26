import { Component, OnInit } from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {Channel} from "../../model/channel";

@Component({
  selector: 'app-subscribed-channels',
  templateUrl: './subscribed-channels.component.html',
  styleUrls: ['./subscribed-channels.component.scss']
})
export class SubscribedChannelsComponent implements OnInit {

  constructor(private _service: UpTubeServiceService) { }
  SubscribedChannels = [] as Channel[]
  processedPage = false
  toggle = true;


  async ngOnInit(): Promise<void> {
    let Subscribed = this._service.getSubscribeFromLocal()
    for (const id of Subscribed) {
      const channels=await this._service.getChannelbyId(id)
      this.SubscribedChannels.push(channels[0])
    }
    this.processedPage = true
  }
  toggleFavoritochannel(channel: Channel) {
    this._service.toggleFavoritochannel(channel.id)
    channel.isSubscribed= !channel.isSubscribed
  }


}
