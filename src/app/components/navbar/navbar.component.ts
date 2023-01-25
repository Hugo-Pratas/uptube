import {Component, HostListener, OnInit} from '@angular/core';
import {
  faHouse as faHouseSolid,
  faBarsStaggered as faBarsStaggeredSolid,
  faPlay as faPlaySolid,
  faClapperboard as faClapperboardSolid,
  faBars
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
  faBars = faBars

  tags = [] as string[];
  processedPage = false
  hideRuleContent = true;
  getScreenWidth = window.innerWidth;

  constructor(private _service: UpTubeServiceService) {
  }

  async ngOnInit(): Promise<void> {
    this.tags = await this._service.getTagsNames()
    this.processedPage = true
  }

  toggleHidden() {
    this.hideRuleContent = !this.hideRuleContent; //toggle para esconder a navbar (nao está no html)
  }

  @HostListener('window:resize', ['$event']) //verificar tamanho ecrã a cada modificação
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }
}
