import {Component, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {Thematic} from "../../model/thematics";

@Component({
  selector: 'app-thematics-page',
  templateUrl: './thematics-page.component.html',
  styleUrls: ['./thematics-page.component.scss']
})
export class ThematicsPageComponent implements OnInit {

  thematics = [] as Thematic[]

  constructor(private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this._service.getThematics().subscribe(d => {
      let data = <Thematic[]>d
      for (const datum of data) {
        this.thematics.push(new Thematic(datum.title, datum.id, datum.tags, datum.teaser, datum.header, datum.thumbnail, datum.logo))
      }
    })
  }
}
