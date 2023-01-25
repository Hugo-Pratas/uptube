import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Video} from 'src/app/model/video';
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  videos = [] as Video[];
  processedPage = false
  getScreenWidth = window.innerWidth;


  constructor(private _service: UpTubeServiceService) {
  }

  async ngOnInit(): Promise<void> {
    this.videos = await this._service.getVideos()
    this.processedPage = true
    this._service.postComment()
  }

  onScroll(scrollable: HTMLDivElement) {
    let scrollTop = scrollable.scrollTop;
    let scrollHeight = scrollable.scrollHeight;
    let screenHeight = window.innerHeight;

    if (scrollTop >= scrollHeight - screenHeight) {
      console.log("fim da pagina")
    }
  }

  @HostListener('window:resize', ['$event']) //verificar tamanho ecrã a cada modificação
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }
}
