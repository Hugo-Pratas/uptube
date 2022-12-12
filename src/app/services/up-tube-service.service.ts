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
      "video": "https://www.youtube.com/embed/F5zg_af9b8c",
    },
    {
      "id": 2,
      "title": "I Can Only Count to FOUR",
      "tags": ["rock", "parody"],
      "video": "https://www.youtube.com/watch?v=u8ccGjar4Es",
    }
  ]

  getVideo(id: number) {
    return this.videos.find(obj => obj.id == id);
  }

  constructor() {
  }
}
