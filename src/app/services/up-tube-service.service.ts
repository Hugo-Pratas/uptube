import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


const BASE_URL = "https://dev-testeuptube.pantheonsite.io";

@Injectable({
  providedIn: 'root'
})

export class UpTubeServiceService {

  constructor(private http: HttpClient) {
  }
  videos = [
    {
      "id": 1,
      "title": "Finlandia",
      "tags": ["natureza", "países", "beleza", "paisagem"],
      "video": "https://www.youtube.com/watch?v=F5zg_af9b8c",
      "user_id": 1,
      "date": new Date(2022, 3, 17, 12, 45, 37, 10)
    },
    {
      "id": 2,
      "title": "I Can Only Count to FOUR",
      "tags": ["rock", "parody"],
      "video": "https://www.youtube.com/watch?v=u8ccGjar4Es",
      "user_id": 2,
      "date": new Date(2022, 3, 17, 12, 45, 37, 10)

    },
    {
      "id": 3,
      "title": "Norway",
      "tags": ["natureza", "países", "beleza", "paisagem"],
      "video": "https://youtube.com/watch?v=5kJFSSP53mU",
      "user_id": 1,
      "date": new Date(2022, 3, 17, 12, 45, 37, 10)
    }
  ]

  user = [
    {
      "id": 1,
      "logo": "../../assets/images/user_logos/unnamed.jpg",
      "name": "Paisagens.pt"
    },
    {
      "id": 2,
      "logo": "../../assets/images/user_logos/índice.jpg",
      "name": "Swedish House Parody"

    }
  ]

  tags = ["pop", "rock", "metal", "natureza", "musica", "dança"]

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
