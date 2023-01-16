import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {faBookmark as solidBookmark, faThumbsUp as solidThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faBookmark, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {iThematic} from "../model/thematics";
import {Video} from '../model/video';
import {Channel} from "../model/channel";
import {Tag} from '../model/tag';
import {Playlist} from "../model/playlist";

const BASE_URL = "https://dev-testeuptube.pantheonsite.io";
const playlist_favourite: Playlist = {
  title: 'Favourites',
  category: 'Favourites',
  id: 'favourites',
  videos: '',
  image: '../../assets/images/favourite_logo.png',
  thumbnail: '../../assets/images/thumbnail_fav.png',
  id_number: 0,
  videos_id: []
}

@Injectable({
  providedIn: 'root'
})

export class UpTubeServiceService {
  bookmark = faBookmark;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  addBase_Route(link: string) {
    return BASE_URL + link
  }

  getApiRoute() {
    return BASE_URL;
  }

  // <<<<<<<<<<<<<<<<<<<<<<<----- VIDEOS ----->>>>>>>>>>>>>>>>>>>>>>>>>>
  getVideos(): Promise<Video[]> {
    return new Promise((resolve) => {
      this.http.get(BASE_URL + "/api/videos").subscribe(videos => {
        for (let video of <Video[]>videos) {
          video = this.sanitizeVideo(video)
        }
        resolve(<Video[]>videos)
      })
    })
  }

  getSugestedVideos(): Promise<Video[]> {
    return new Promise((resolve) => {
      this.http.get(BASE_URL + "/api/SugestedVideos").subscribe(videos => {
        for (let video of <Video[]>videos) {
          video = this.sanitizeVideo(video)
        }
        resolve(<Video[]>videos)
      })
    })
  }

  getVideosIdsFromChannel(id_channel: number): Promise<number[]> {
    return new Promise((resolve) => {
      this.getChannelbyId(id_channel).then(channels => {
        let videos_id: number[] = [];
        for (const d of <Channel[]>channels) {
          videos_id.push(d.video_id)
        }
        resolve(videos_id);
      })
    })
  }

  getVideosIdbyTagName(tag_name: string): Promise<number[]> {
    return new Promise((resolve, reject) => {
      this.http.get(BASE_URL + "/api/tag/" + tag_name).subscribe(tagsData => {
        let videos_id: number[] = [];
        for (const tag of <any[]>tagsData) {
          videos_id.push(tag.video_id)
        }
        resolve(videos_id);
      })
    })
  }

  getVideosIdbyTagId(tag_id: number): Promise<number[]> {
    return new Promise((resolve, reject) => {
      this.http.get(BASE_URL + "/api/tagid/" + tag_id).subscribe(tagsData => {
        let videos_id: number[] = [];
        for (const tag of <any[]>tagsData) {
          videos_id.push(tag.video_id)
        }
        resolve(videos_id);
      })
    })
  }

  getVideo(id_video: number): Promise<Video> {
    return new Promise((resolve) => {
      return this.http.get(BASE_URL + "/api/video/" + id_video).subscribe(apiJson => {
        let data_arr = <Video[]>apiJson;
        let video = this.sanitizeVideo(data_arr[0])
        resolve(video);
      });
    })
  }

  getVideosFromIds(ids_videos: number[]): Promise<Video[]> { //need this to get video ordered by date from db
    return new Promise((resolve) => {
      let ids_string = ids_videos.join(",")
      this.http.get(BASE_URL + "/api/video/" + ids_string).subscribe(apiJson => {
        let videos = <Video[]>apiJson
        for (let video of videos) {
          video = this.sanitizeVideo(video)
        }
        resolve(videos)
      })
    })
  }

  sanitizeVideo(video: Video): Video {
    video.tags_arr = video.tags.split(",").map(Number) //as tags vêm em string da api....
    video.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(video.url.replace("watch?v=", "embed/"));
    video.id_number = parseInt(video.id)
    video.thumbnail = this.addBase_Route(video.thumbnail)
    return video
  }

  // <<<<<<<<<<<<<<<<<<<<<<<----- CHANNELS ----->>>>>>>>>>>>>>>>>>>>>>>>>>
  sanitizeChannel(channel: Channel): Channel {
    channel.logo = this.addBase_Route(channel.logo)
    channel.banner = this.addBase_Route(channel.banner)
    return channel
  }

  getSugestedChannels(): Promise<Channel[]> {
    return new Promise((resolve, reject) => {
      this.http.get(BASE_URL + "/api/channels").subscribe(jsonData => { //api dos sugeridos não está a funcionar no drupal
        let channels = <Channel[]>jsonData
        for (let channel of channels) {
          channel = this.sanitizeChannel(channel)
        }
        resolve(channels)
      })
    })
  }

  getChannelbyId(id: number): Promise<Channel[]> { //retorna array de channels por causa de varios videos ids
    return new Promise((resolve) => {
      this.http.get(BASE_URL + "/api/channel/" + id).subscribe(channels => {
        for (let channel of <Channel[]>channels) {
          channel = this.sanitizeChannel(channel)
        }
        resolve(<Channel[]>channels);
      })
    })
  }

  getChannels(): Promise<Channel[]> {
    return new Promise((resolve) => {
      this.http.get(BASE_URL + "/api/channels").subscribe(jsonData => {
        let channels = <Channel[]>jsonData
        for (let channel of channels) {
          channel = this.sanitizeChannel(channel)
        }
        resolve(channels)
      })
    })
  }

  // <<<<<<<<<<<<<<<<<<<<<<<----- TAGS ----->>>>>>>>>>>>>>>>>>>>>>>>>>


  getTags() {
    return this.http.get(BASE_URL + "/api/tags")
  }

  getTagsNames(): Promise<string[]> {
    return new Promise((resolve) => {
      this.getTags().subscribe(data => {
        let tags: string[] = [];
        for (const d of <Tag[]>data) {
          tags.push(d.name)
        }
        resolve(tags);
      })
    })
  }

  getTagsNamebyID(ids: number[]): Promise<string[]> {
    return new Promise((resolve) => {
      this.getTags().subscribe(d => {
        let data = <Tag[]>d;
        let tags: string[] = [];
        for (const id of ids) {
          tags.push(data.filter(obj => obj.tid == id).map(obj => obj.name).toString())
        }
        resolve(tags);
      })
    })
  }

  // <<<<<<<<<<<<<<<<<<<<<<<----- THEMATICS ----->>>>>>>>>>>>>>>>>>>>>>>>>>
  sanitizeThematics(thematic: iThematic): iThematic {
    thematic.header = this.addBase_Route(thematic.header)
    thematic.thumbnail = this.addBase_Route(thematic.thumbnail)
    thematic.logo = this.addBase_Route(thematic.logo)
    return thematic
  }

  getThematics(): Promise<iThematic[]> {
    return new Promise((resolve) => {
      this.http.get(BASE_URL + "/api/thematics").subscribe(apiJson => {
        let thematics = <iThematic[]>apiJson
        for (let thematic of thematics) {
          thematic = this.sanitizeThematics(thematic)
        }
        resolve(thematics)
      })
    })
  }

  getThematicsById(id_thematic: number): Promise<iThematic> {
    return new Promise((resolve) => {
      this.http.get(BASE_URL + "/api/thematics/" + id_thematic).subscribe(apiJson => {
        let thematics = <iThematic[]>apiJson
        let theme = this.sanitizeThematics(thematics[0])
        resolve(theme)
      })
    })
  }

  getSuggestedThematics() {
    return this.http.get(BASE_URL + "/api/suggestedthematics")
  }

  getThematicTagsById(id: number): Promise<number[]> {
    return new Promise((resolve) => {
      this.http.get(BASE_URL + "/api/thematics/" + id).subscribe(thematic => {
        let thematicData = <iThematic[]>thematic
        let tags = thematicData[0].tags.split(",").map(Number) //as tags vêm em string da api....
        resolve(tags)
      })
    })
  }

  // <<<<<<<<<<<<<<<<<<<<<<<----- PLAYLIST ----->>>>>>>>>>>>>>>>>>>>>>>>>>
  sanitizePlaylist(playlist: Playlist): Playlist {
    playlist.image = this.addBase_Route(playlist.image)
    playlist.thumbnail = this.addBase_Route(playlist.thumbnail)
    playlist.id_number = parseInt(playlist.id)
    playlist.videos_id = playlist.videos.split(",").map(Number)
    return playlist
  }

  getPlaylists(): Promise<Playlist[]> {
    return new Promise((resolve) => {
      this.http.get(BASE_URL + "/api/playlists").subscribe(d => {
        let playlists = <Playlist[]>d
        for (let playlist of playlists) {
          playlist = this.sanitizePlaylist(playlist)
        }
        playlists.push(playlist_favourite)
        resolve(playlists)
      })
    })
  }

  getPlaylistById(id_playlist: number): Promise<Playlist> {
    return new Promise((resolve) => {
      this.http.get(BASE_URL + "/api/playlist/" + id_playlist).subscribe(d => {
        let playlists = <Playlist[]>d
        let playlist = this.sanitizePlaylist(playlists[0])
        resolve(playlist)
      })
    })
  }

  // <<<<<<<<<<<<<<<<<<<<<<<-----COMMENTS----->>>>>>>>>>>>>>>>>>>>>>>>>>
  getSessionToken(): Promise<string> {
    return new Promise((resolve) => {
      return this.http.get(BASE_URL + "/session/token", {responseType: 'text'}).subscribe(d => {
        resolve(d)
      })

    })
  }

  async postComment() {
    let token = await this.getSessionToken()
    const headers = new HttpHeaders().set('Accept', 'application/vnd.api+jason').set('X-CSRF-Token', token);
    const body = {
      "field_date": [{"value": new Date()}],
      "field_email": [{"value": "hugo@email.com"}],
      "field_logo": [{"value": ""}],
      "field_username": [{"value": ""}],
      "comment_body": [{"value": "O comentario foi posted", "format": "plain_text"}]
    }
    this.http.post<any>('https://dev-testeuptube.pantheonsite.io/api/comment', body, {headers}).subscribe(d => {
      console.log(d)
    })
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
}
