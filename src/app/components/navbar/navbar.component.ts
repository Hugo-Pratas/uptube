import { Component, OnInit, HostListener } from '@angular/core';
import {
  faHouse as faHouseSolid,
  faBarsStaggered as faBarsStaggeredSolid,
  faPlay as faPlaySolid,
  faClapperboard as faClapperboardSolid
} from "@fortawesome/free-solid-svg-icons";
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faHouseSolid = faHouseSolid;
  faBarsStaggeredSolid = faBarsStaggeredSolid;
  faPlaySolid = faPlaySolid;
  faClapperboardSolid = faClapperboardSolid;

  public getScreenWidth: any;
  public getScreenHeight: any;
  tags: any;

  constructor(private _service: UpTubeServiceService) { }

  public hideRuleContent= false;

  toggle() {
    this.hideRuleContent = !this.hideRuleContent;
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.tags = this._service.getTags();
  }


  @HostListener('window:resize', ['$event']) //verificar tamanho ecrã a cada modificação
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    //console.log(this.getScreenWidth);
  }
}
