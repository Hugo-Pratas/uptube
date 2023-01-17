import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-all-channels',
  templateUrl: './all-channels.component.html',
  styleUrls: ['./all-channels.component.scss']
})
export class AllChannelsComponent implements OnInit {
  channel: any;
  id_channel = -1;
  bookmark = faBookmark;
  processedPage = false;
  apiLink = "";

  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this.apiLink = this._service.getApiRoute();
      this._service.getChannels().subscribe(channel => {
        this.channel = channel
      })
      console.log(this.channel)

  }

}
