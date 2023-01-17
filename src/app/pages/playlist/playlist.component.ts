import {Component, OnInit} from '@angular/core';
import {Video} from 'src/app/model/video';
import {Playlist} from "../../model/playlist";
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlist = {} as Playlist
  videos = {} as Video[]
  processedPage = false

  constructor(private _service: UpTubeServiceService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async r => {
      let id_playlist = <string>r.get('id_playlist')
      this.playlist = await this._service.getPlaylistById(parseInt(id_playlist))
      this.videos = await this._service.getVideosFromIds(this.playlist.videos_id)
      this.processedPage = true
    });
  }

}
