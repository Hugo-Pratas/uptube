import {Component, Input, OnInit} from '@angular/core';
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

  constructor(private _service: UpTubeServiceService) {

  }

  ngOnInit(): void {
    this._service.getSuggestedThematics().subscribe(d => {
      let data = <iThematic[]>d
      this.thematic = data[0] //FOI AQUI QUE FICASTE 1 HORA À TOA, ATENÇÃO
    })
  }
}
