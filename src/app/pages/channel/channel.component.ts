import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {Video} from "../../model/video";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  channel:any;
  id_channel= -1;
  bookmark = faBookmark;
  processedPage = false;
  apiLink="";
  videos= [] as Video[];

  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService) { }

  ngOnInit(): void {
    this.apiLink=this._service.getApiRoute();
    this.route.params.subscribe(r => {
      this.id_channel = parseInt(r['id_channel'])
      this._service.getChannel(this.id_channel).subscribe(channel =>{
        this.channel=channel
        this.channel=this.channel[0]
        this._service.getVideosChannel(this.id_channel).then( ids => {
          let indice= <number[]>ids;
           for (const id of indice) {
             this._service.getVideoData(id).then(video => {
               let videos1=<Video>video
               this.videos.push(videos1)
           })


          }
           console.log(this.videos)
        })
        this.processedPage=true

      })



    });

  }

}
