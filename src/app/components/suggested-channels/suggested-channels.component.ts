import {Component, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-suggested-channels',
  templateUrl: './suggested-channels.html',
  styleUrls: ['./suggested-channels.scss']
})


export class SuggestedChannelsComponent implements OnInit {

  users: any;

  constructor(private _service: UpTubeServiceService) {
  }

  ngOnInit(): void {
    this._service.getUsers().subscribe(d => {
      this.users = d
      this.users = this.users[0] //api retorna array...
    })
  }
}
