import {Component, Input, OnInit} from '@angular/core';
import {Channel} from "../../model/channel";
import {Video} from "../../model/video";
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {iThematic} from "../../model/thematics";
import {Subject} from "rxjs";

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
  processedPage = false
  clickSubject: Subject<any> = new Subject();


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

  onScroll(scrollable: HTMLDivElement) {
    let scrollTop = scrollable.scrollTop;
    let scrollHeight = scrollable.scrollHeight;
    let screenHeight = window.innerHeight;

    if (scrollTop >= scrollHeight - screenHeight) {
      this.clickSubject.next(1);
    }
  }

}
