import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {faBookmark as solidBookmark, faThumbsUp as solidThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faBookmark, faThumbsUp} from "@fortawesome/free-regular-svg-icons";


const BASE_URL = "https://dev-testeuptube.pantheonsite.io";

@Injectable({
  providedIn: 'root'
})

export class UpTubeServiceService {
  bookmark = faBookmark;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  getApiRoute() {
    return BASE_URL;
  }

  getSugestedChannels() {
    return this.http.get(BASE_URL + "/api/channels")
  }

  getSuggestedThematics() {
    return this.http.get(BASE_URL + "/api/suggestedthematics")
  }

  getVideos() {
    return this.http.get(BASE_URL + "/api/videos")
  }

  getSugestedVideos() {
    return this.http.get(BASE_URL + "/api/SugestedVideos")
  }

  getVideo(id: number) {
    return this.http.get(BASE_URL + "/api/video/" + id)
  }

  getTags() {
    return this.http.get(BASE_URL + "/api/tags")
  }

  getChannels() {
    return this.http.get(BASE_URL + "/api/channels")

  }

  getChannel(id: number) {

    return this.http.get(BASE_URL + "/api/channel/" + id)

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

  getVideosIdbyTag(tag_id: string): Promise<number[]> {
    return new Promise((resolve) => {
      this.http.get(BASE_URL + "/api/tag/" + tag_id).subscribe(tagsData => {
        let videos_id: number[] = [];
        for (const tag of <any[]>tagsData) {
          videos_id.push(tag.video_id)
        }
        resolve(videos_id);
      })
    })
  }

  getVideoData(id_video: number) {
    return new Promise((resolve) => {
      let data: any;
      this.getVideo(id_video).subscribe(d => {
        data = d;
        data = data[0]; //api retorna array
        data.tags = data.tags.split(",").map(Number) //as tags vêm em string da api....
        data.url = this.sanitizer.bypassSecurityTrustResourceUrl(data.url.replace("watch?v=", "embed/"));
        resolve(data);
      });
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

  getUsers() {
    return this.http.get(BASE_URL + "/api/channels")
  }

  getUserData(id_user: number) {
    return new Promise((resolve) => {
      let user: any
      user = this.getUser(id_user).subscribe(d => {
        user = d;
        user = user[0]
        resolve(user);
      })
    })
  }

  getThematics() {
    return this.http.get(BASE_URL + "/api/thematics")
  }

  //<<<<<<<<<<<<<<<<<<<<<<<Local Storage and Favourites>>>>>>>>>>>>>>>>>>>>>>>>>>

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

  toggleFavorito(id_video: number) {
    if (this.isFavourite(id_video)) {
      this.removeFavouriteFromLocal(id_video)
    } else {
      this.addFavouriteToLocal(id_video)
    }
  }

  icone_favorito(id_video: number) {
    return this.isFavourite(id_video) ? solidBookmark : faBookmark;
  }

  isFavourite(id_video: number): boolean {
    return this.getFavouritesFromLocal().includes(id_video);
  }

  getVideosChannel(id: number) {
    return new Promise((resolve) => {
      this.getChannel(id).subscribe(data => {
        let videos: number[] = [];
        let id_video = <any[]>data;

        for (const d of id_video) {
          videos.push(d.video_id)
        }
        resolve(videos);
      })
    })
  }
}
