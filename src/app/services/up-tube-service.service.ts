import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


const BASE_URL = "https://dev-testeuptube.pantheonsite.io";

@Injectable({
  providedIn: 'root'
})

export class UpTubeServiceService {

  constructor(private http: HttpClient) {
  }

  getVideo(id: number) {
    return this.http.get(BASE_URL + "/api/video/" + id)
  }

  getTags() {
    return this.http.get(BASE_URL + "/api/tags")
  }

  getTagsNames(){
    return new Promise((resolve, reject) =>{
      this.getTags().subscribe(data => {
        let tags: string[] = [];
        // @ts-ignore
        for (const d of data) {
          tags.push(d.name)
        }
        resolve(tags);
      })
    })
  }

  getTagsNamebyID(id :number[]) {
    return new Promise((resolve, reject) =>{
      let data : any;
      this.getTags().subscribe(d => {
        data=d;
        let tags: any[] = [];
        for (const number of id) {
          // @ts-ignore
          tags.push(data.filter(obj => obj.tid==number).map(obj => obj.name).toString())
        }
        resolve(tags);
      })
    })
  }

  getUser(id: number) {
    return this.http.get(BASE_URL + "/api/channel/" + id)
  }


}
