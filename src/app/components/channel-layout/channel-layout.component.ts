import {Component, Input, OnInit} from '@angular/core';
import {Channel} from "../../model/channel";
import {Video} from "../../model/video";
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {iThematic} from "../../model/thematics";

@Component({
  selector: 'app-channel-layout',
  templateUrl: './channel-layout.component.html',
  styleUrls: ['./channel-layout.component.scss']
})
export class ChannelLayoutComponent implements OnInit {
  @Input() channel = {} as Channel;
  @Input() videos = [] as Video[];
  @Input() thematic = {} as iThematic
  isChannelView = true
  apiLink = this._service.getApiRoute()
  processedPage = false

  constructor(private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    if ((Object.keys(this.thematic).length !== 0)) {
      let thematic = this.thematic
      this.channel.banner = thematic.header
      this.channel.logo = thematic.logo
      this.channel.name = thematic.title
      this.channel.description = thematic.teaser
      this.isChannelView = false
    }
    this.processedPage = true
  }

}
