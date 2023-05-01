import { addMilliseconds, format } from "date-fns"
import { IArtist } from "../interfaces/IArtist"
import { IPlaylist } from "../interfaces/IPlaylist"
import { ITrack } from "../interfaces/ITrack"
import { IUser } from "../interfaces/IUser"
import { newPlaylist, newTrack } from "./factories"

export function SpotifyUserToUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser{
    return {
        id: user.id,
        name: user.display_name,
        imageUrl: user.images.pop().url
    }
}

export function SpotifyPlaylistToPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist{
    return {
        id: playlist.id,
        name: playlist.name,
        imageUrl: playlist.images.pop().url
    }
}

export function SpotifyPlaylistToSinglePlaylist(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist{
  if (!playlist) {
    return newPlaylist()
  }
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.shift().url,
    tracks: []
  }
}

export function SpotifyArtistToArtist(spotifyArtist: SpotifyApi.ArtistObjectFull) : IArtist{
  return {
    id: spotifyArtist.id,
    imageUrl:spotifyArtist.images.sort((a,b) => a.width - b.width).pop().url,
    name: spotifyArtist.name
  }
}

export function SpotifyTrackToTrack(spotifyTrack: SpotifyApi.TrackObjectFull) : ITrack{
  if(!spotifyTrack){
    return newTrack()
  }
  const msToMin = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms)
    return format(data, 'mm:ss')
  }
  
  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      imageUrl: spotifyTrack.album.images.shift().url,
      name: spotifyTrack.album.name
    },
    artists: spotifyTrack.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    time: msToMin(spotifyTrack.duration_ms)
  }
}


