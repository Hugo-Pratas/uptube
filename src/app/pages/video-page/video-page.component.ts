import {Component, OnInit, Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {faFlag} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faThumbsDown} from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp as solidThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faThumbsDown as solidThumbsDown} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})


export class VideoPageComponent implements OnInit {
  videoData: any;
  userData: any;
  id_video: number = -1;
  processedPage= false;

  logo="https://dev-testeuptube.pantheonsite.io/sites/default/files/2022-12/logo.png"
  flag = faFlag;



  constructor(private route: ActivatedRoute, private _service: UpTubeServiceService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

this.getRouteID().then((id) =>{
  // @ts-ignore
  this.id_video=id
  this.getVideoData(this.id_video).then((video) =>{
    this.videoData=video
    this.getUserData(this.videoData.channel).then((user)=>{
      this.userData=user
      this.processedPage=true
    })
  })
})

/*
    localStorage.setItem(key, value);
*/
  }

  getRouteID(){
    return new Promise((resolve) =>{
      let id_video: number= -1;
      this.route.params.subscribe(q => {
        id_video = q['id_video']
        resolve(id_video)
      });
    })
  }

  getVideoData(id_video: number){
    return new Promise((resolve) =>{
      let data: any;
      this._service.getVideo(id_video).subscribe(d =>{
        data=d;
        data=data[0]; //api retorna array
        data.tags=data.tags.split(",").map(Number) //as tags vêm em string da api....
        data.url = this.sanitizer.bypassSecurityTrustResourceUrl(data.url.replace("watch?v=", "embed/"));
        resolve(data);
      });
    })
  }

  getUserData(id_user: number){
    return new Promise((resolve) =>{
      let user: any
      user = this._service.getUser(id_user).subscribe(d =>{
        user=d;
        user=user[0]
        resolve(user);
      })
    })
  }

  report(id: number) {
    console.log("carreguei", id)
  }


  icone_favorito(isFavourite :boolean) {
    return isFavourite ? solidThumbsUp : faThumbsUp;
  }
}


