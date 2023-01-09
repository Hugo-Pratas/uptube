export interface Video {
  id: string;  //api retorna string =)
  id_number: number;
  name: string;
  tags: string | number[];
  url: string;
  category: number;
  channel: number;
  description: string;
  thumbnail: string;
  date: string;
  duration: string
}
