export interface iThematic {
  title: string;
  id: number;
  tags: string | number[];
  teaser: string;
  header: string;
  thumbnail: string;
  logo: string;
}

export class Thematic implements iThematic {

  constructor(public title: string, public id: number, public tags: string, public teaser: string, public header: string, public thumbnail: string, public logo: string) {
    this.title = title
    this.id = id
    this.tags = tags
    this.teaser = teaser
    this.header = header
    this.thumbnail = "agora aqui adiciono cenas" + thumbnail
    this.logo = logo
  }
}
