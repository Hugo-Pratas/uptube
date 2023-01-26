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

  currentPage = 0;
  endPage = false;

  constructor(private _service: UpTubeServiceService) {
  }

  async ngOnInit(): Promise<void> {
    this.videos = await this._service.getVideos(this.currentPage)
    this.processedPage = true
    //this._service.postComment()
  }

  async onScroll(scrollable: HTMLDivElement) {
    let scrollTop = scrollable.scrollTop;
    let scrollHeight = scrollable.scrollHeight;
    let screenHeight = window.innerHeight;

    if (scrollTop >= scrollHeight - screenHeight - 10) {
      if (!this.endPage) {
        this.currentPage++
        this.endPage = true
        let newVideos = await this._service.getVideos(this.currentPage)
        this.videos = [...this.videos, ...newVideos]
        if (newVideos.length == 10) {
          setTimeout(() => {
            this.endPage = false
          }, 2000);
        }
      }
    }
  }

  @HostListener('window:resize', ['$event']) //verificar tamanho ecrã a cada modificação
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }
}
