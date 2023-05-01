import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/enviroment';
import Spotify from 'spotify-web-api-js'
import { IUser } from '../interfaces/IUser';
import { SpotifyArtistToArtist, SpotifyPlaylistToPlaylist, SpotifyPlaylistToSinglePlaylist, SpotifyTrackToTrack, SpotifyUserToUser } from '../common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IArtist } from '../interfaces/IArtist';
import { ITrack } from '../interfaces/ITrack';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null
  user: IUser

  constructor(private router: Router) {
    this.spotifyApi = new Spotify()
  }

  async startUser(){
    if(!!this.user){
      return true
    }
    const token = localStorage.getItem('token')

    if(!token){
      return false
    }

    try{
      this.setAccessUrlToken(token)
      await this.getSpotifyUser()
      return !!this.user
    }catch(ex){
      return false
    }
  }

  async getSpotifyUser(){
    const userInfo = await this.spotifyApi.getMe()
    this.user = SpotifyUserToUser(userInfo)
  }

  getUrlLogin(){''
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenUrlCallback(){
    if (!window.location.hash){
      return ''
    }
    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1]
  }

  setAccessUrlToken(token: string){
    this.spotifyApi.setAccessToken(token)
    localStorage.setItem('token', token)
  }

  async getPlaylistUser(offset = 0, limit = 50): Promise<IPlaylist[]>{
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, { limit:50 })
    return playlists.items.map(SpotifyPlaylistToPlaylist)
  }

  async getTopArtists(limit = 10): Promise<IArtist[]>{
    const artists = await this.spotifyApi.getMyTopArtists({ limit })
    return artists.items.map(SpotifyArtistToArtist)
  }

  async getTracks(offset=0, limit=50): Promise<ITrack[]>{
    const tracks = await this.spotifyApi.getMySavedTracks({offset, limit})
    return tracks.items.map(x => SpotifyTrackToTrack(x.track))
  }

  async getCurrentTrack(): Promise<ITrack>{
    const track = await this.spotifyApi.getMyCurrentPlayingTrack()
    return SpotifyTrackToTrack(track.item)
  }

  async getPlaylistTracks(playlistId: string, offset: number = 0, limit = 50){
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId)
    if (!playlistSpotify){
      return null
    }
    const playlist = SpotifyPlaylistToSinglePlaylist(playlistSpotify)
    const tracks = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit })
    playlist.tracks = tracks.items.map(track => SpotifyTrackToTrack(track.track as SpotifyApi.TrackObjectFull))
    
    return playlist
  }

  async playTrack(trackId: string){
    await this.spotifyApi.queue(trackId)
    await this.spotifyApi.skipToNext()
  }

  async nextTrack(){
    await this.spotifyApi.skipToNext()
  }

  async previousTrack(){
    await this.spotifyApi.skipToPrevious()
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
