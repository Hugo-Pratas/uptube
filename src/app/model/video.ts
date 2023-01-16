import {SafeResourceUrl} from "@angular/platform-browser";

export interface Video {
  id: string;  //api retorna string =)
  id_number: number;
  name: string;
  tags: string;
  tags_arr: number[]
  url: string;
  safe_url: SafeResourceUrl;
  category: number;
  channel: number;
  description: string;
  thumbnail: string;
  date: string;
  duration: string
}
