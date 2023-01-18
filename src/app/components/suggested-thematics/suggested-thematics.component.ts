import {Component, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {iThematic} from "../../model/thematics";

@Component({
  selector: 'app-suggested-thematics',
  templateUrl: './suggested-thematics.component.html',
  styleUrls: ['./suggested-thematics.component.scss']
})
export class SuggestedThematicsComponent implements OnInit {

  thematic = {} as iThematic;
  apiRoute = this._service.getApiRoute()
  processedPage = false

  constructor(private _service: UpTubeServiceService) {

  }

  async ngOnInit(): Promise<void> {
    this.thematic = await this._service.getSuggestedThematic()
    this.processedPage = true
  }
}
