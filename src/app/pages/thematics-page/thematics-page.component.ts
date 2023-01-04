import {Component, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-thematics-page',
  templateUrl: './thematics-page.component.html',
  styleUrls: ['./thematics-page.component.scss']
})
export class ThematicsPageComponent implements OnInit {

  thematics: any

  constructor(private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this._service.getThematics().subscribe(d => {
      this.thematics = d
    })
  }

}
