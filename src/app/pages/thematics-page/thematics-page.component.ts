import {Component, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {iThematic} from "../../model/thematics";

@Component({
  selector: 'app-thematics-page',
  templateUrl: './thematics-page.component.html',
  styleUrls: ['./thematics-page.component.scss']
})
export class ThematicsPageComponent implements OnInit {

  thematics = [] as iThematic[]

  constructor(private _service: UpTubeServiceService) {
  }

  async ngOnInit(): Promise<void> {
    this.thematics = await this._service.getThematics()
  }
}
