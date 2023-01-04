import { Component, Input, OnInit } from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-suggested-thematics',
  templateUrl: './suggested-thematics.component.html',
  styleUrls: ['./suggested-thematics.component.scss']
})
export class SuggestedThematicsComponent implements OnInit {

  thematics: any
  apiRoute = this._service.getApiRoute()

  constructor(private _service: UpTubeServiceService) {

  }

  ngOnInit(): void {
    this._service.getSuggestedThematics().subscribe(d => {
      // @ts-ignore
      this.thematics = d.splice(0,2)
      console.log(this.thematics)
    })
  }

}
