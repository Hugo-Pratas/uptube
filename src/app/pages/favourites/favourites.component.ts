import {Component, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {Video} from "../../model/video";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  constructor(private _service: UpTubeServiceService) {
  }

  videos = [] as Video[]
  processedPage = false

  async ngOnInit(): Promise<void> {
    let favourites = this._service.getFavouritesFromLocal()
    for (const id of favourites) {
      this.videos.push(await this._service.getVideo(id))
    }
    this.processedPage = true
  }

}
