import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newTrack } from 'src/app/common/factories';
import { ITrack } from 'src/app/interfaces/ITrack';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit, OnDestroy{

  bannerImageUrl = ''
  bannerText = ''
  title = ''

  tracks: ITrack[] = []
  currentTrack: ITrack = newTrack()

  playIcon = faPlay

  subs: Subscription[] = []

  constructor(
    private activeRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
    ){}

  ngOnInit(): void {
    this.getTracks()
    this.getCurrentTrack()
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  getTracks(){
    const sub = this.activeRoute.paramMap
      .subscribe(async params => {
        const type = params.get('type')
        const id = params.get('id')
        await this.GetPageData(type, id)
      })
    this.subs.push(sub)
  }

  async GetPageData(type: string, id: string){
    if (type === 'playlist') {
      await this.GetPlaylistData(id)
    } else {
      await this.GetArtistData(id)
    }
  }

  async GetPlaylistData(playlistId: string){
    const playlistTracks = await this.spotifyService.getPlaylistTracks(playlistId)
    this.setPageData(playlistTracks.name, playlistTracks.imageUrl, playlistTracks.tracks)
    this.title = 'Musicas Playlist: ' + playlistTracks.name
  }

  async GetArtistData(artistId: string){

  }

  getArtists(track: ITrack){
    return track.artists.map(artist => artist.name).join(', ')
  }

  getCurrentTrack(){
    const sub = this.playerService.currentTrack.subscribe(track => {
      this.currentTrack = track
    })
    this.subs.push(sub)
  }

  setPageData(bannerText: string, bannerImage: string, tracks: ITrack[]){
    this.bannerImageUrl = bannerImage
    this.bannerText = bannerText
    this.tracks = tracks
  }

  async playTrack(track: ITrack){
    await this.spotifyService.playTrack(track.id)
    this.playerService.setCurrentTrack(track)
  }

}
