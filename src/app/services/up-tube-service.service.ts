import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


const BASE_URL = "https://dev-testeuptube.pantheonsite.io";

@Injectable({
  providedIn: 'root'
})

export class UpTubeServiceService {

  constructor(private http: HttpClient) {
  }

  getIdVideos(){
    return this.videos.map(v => v.id)
  }

  getVideo(id: number) {
    return this.http.get(BASE_URL + "/api/video/" + id)
  }


  getTags() {
    return this.http.get(BASE_URL + "/api/tags")
  }

  getTagsNames() {
    return new Promise((resolve) => {
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

  getTagsNamebyID(id: number[]) {
    return new Promise((resolve) => {
      let data: any;
      this.getTags().subscribe(d => {
        data = d;
        let tags: any[] = [];
        for (const number of id) {
          // @ts-ignore
          tags.push(data.filter(obj => obj.tid == number).map(obj => obj.name).toString())
        }
        resolve(tags);
      })
    })
  }

  getUser(id: number) {
    return this.http.get(BASE_URL + "/api/channel/" + id)
  }

  getFavouritesFromLocal() {
    let favourites = localStorage.getItem("Favourites")
    if (favourites !== null) {
      return JSON.parse(favourites)
    }
    return []
  }

  removeFavouriteFromLocal(id_video: number) {
    let favourites = this.getFavouritesFromLocal()
    let indice = favourites.indexOf(id_video)
    favourites.splice(indice, 1)
    localStorage.setItem("Favourites", JSON.stringify(favourites))
  }

  addFavouriteToLocal(id_video: number) {
    let favourites = this.getFavouritesFromLocal()
    favourites.push(id_video)
    localStorage.setItem("Favourites", JSON.stringify(favourites))
  }
}
