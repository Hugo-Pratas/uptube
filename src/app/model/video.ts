export interface Video {
  id: number;
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
