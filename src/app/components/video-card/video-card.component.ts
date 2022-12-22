import {Component, Input, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  user: any;
  apiRoute = ""
  @Input() video_data: any;
  logo = "https://dev-testeuptube.pantheonsite.io/sites/default/files/2022-12/logo.png" //o logo da api n tá como deve de ser


  constructor(private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this.apiRoute = this._service.getApiRoute()
    this.user = this._service.getUser(this.video_data.channel).subscribe(d => {
      this.user = d
      this.user = this.user[0] //api retorna array...
    })
  }
}
