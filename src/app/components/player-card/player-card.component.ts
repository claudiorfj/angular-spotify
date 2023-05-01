import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCirclePause, faCirclePlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newTrack } from 'src/app/common/factories';
import { ITrack } from 'src/app/interfaces/ITrack';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  track: ITrack = newTrack()

  previousIcon = faStepBackward
  nextIcon = faStepForward
  playIcon = faCirclePlay
  pauseIcon = faCirclePause
  
  subs: Subscription[] = []

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService,
  ){ }
  
  ngOnInit(): void {
    this.getPlayingTrack()
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub => sub.unsubscribe())
  }

  getPlayingTrack(){
    const sub = this.playerService.currentTrack.subscribe(track => {
      this.track = track
    })
    this.subs.push(sub)
  }

  nextTrack(){
    this.playerService.nextTrack()
  }

  previousTrack(){
    this.playerService.previousTrack()
  }

  async playOrPauseTrack(track: ITrack){
    await this.spotifyService.playTrack(track.id)
    this.playerService.setCurrentTrack(track)
  }

  async pauseTrack(track: ITrack){
    await this.spotifyService.playTrack(track.id)
    this.playerService.setCurrentTrack(track)
  }

}
