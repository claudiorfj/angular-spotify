import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITrack } from 'src/app/interfaces/ITrack';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';
import { newTrack } from 'src/app/common/factories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  tracks: ITrack[] = []
  currentTrack: ITrack = newTrack()

  subs: Subscription[] = [] 

  playIcon = faPlay

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService,
  ){ }

  ngOnInit(): void{
    this.getTracks()
    this.getCurrentTrack()
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  async getTracks(){
    this.tracks = await this.spotifyService.getTracks()
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
  
  async playTrack(track: ITrack){
    await this.spotifyService.playTrack(track.id)
    this.playerService.setCurrentTrack(track)
  }
}
