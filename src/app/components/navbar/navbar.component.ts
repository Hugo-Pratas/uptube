import {Component, OnInit} from '@angular/core';
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
  tags = [] as string[];

  constructor(private _service: UpTubeServiceService) {
  }

  public hideRuleContent = false;

  toggle() {
    this.hideRuleContent = !this.hideRuleContent; //toggle para esconder a navbar (nao está no html)
  }

  async ngOnInit(): Promise<void> {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.tags = await this._service.getTagsNames()
  }


  /*  @HostListener('window:resize', ['$event']) //verificar tamanho ecrã a cada modificação
    onWindowResize() {
      this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
      //console.log(this.getScreenWidth);
    }*/
}
