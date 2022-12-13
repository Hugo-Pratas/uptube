import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpTubeServiceService {


  videos = [
    {
      "id": 1,
      "title": "Finlandia",
      "tags": ["natureza", "países", "beleza", "paisagem"],
      "video": "https://www.youtube.com/watch?v=F5zg_af9b8c",
      "user_id":1
    },
    {
      "id": 2,
      "title": "I Can Only Count to FOUR",
      "tags": ["rock", "parody"],
      "video": "https://www.youtube.com/watch?v=u8ccGjar4Es",
      "user_id":2
    },
    {
      "id": 3,
      "title": "Norway",
      "tags": ["natureza", "países", "beleza", "paisagem"],
      "video": "https://youtube.com/watch?v=5kJFSSP53mU",
      "user_id":1
    }
  ]

  user=[
    {
      "id": 1,
      "logo": "../../assets/images/user_logos/unnamed.jpg"
    },
    {
      "id":2,
      "logo": "../../assets/images/user_logos/índice.jpg"
    }
  ]

  tags=["pop", "rock", "metal", "natureza"]

  getVideo(id: number) {
    return this.videos.find(obj => obj.id == id);
  }

  getTags() {
    return this.tags
  }

  getUser(id: number){
    return this.user.find(obj => obj.id == id)
  }

  constructor() {
  }
}
