import {Component, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-menu-top-right',
  templateUrl: './menu-top-right.component.html',
  styleUrls: ['./menu-top-right.component.scss']
})


export class MenuTopRightComponent implements OnInit {

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
