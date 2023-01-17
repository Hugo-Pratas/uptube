import {Component, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {Playlist} from "../../model/playlist";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-playlists-page',
  templateUrl: './playlists-page.component.html',
  styleUrls: ['./playlists-page.component.scss']
})
export class PlaylistsPageComponent implements OnInit {
  playlists = [] as Playlist[]
  processedPage = false

  constructor(private _service: UpTubeServiceService) {
  }

  async ngOnInit(): Promise<void> {
    this.playlists = await this._service.getPlaylists()
    this.processedPage = true
  }

}
