import { IArtist } from "../interfaces/IArtist";
import { IPlaylist } from "../interfaces/IPlaylist";
import { ITrack } from "../interfaces/ITrack";

export function newArtist(): IArtist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    tracks: []
  };
}

export function newTrack(): ITrack {
  return {
    id: '',
    album: {
      id: '',
      imageUrl: '',
      name: '',
    },
    artists: [],
    time: '',
    title: ''
  }
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    tracks: [],
  }
}
