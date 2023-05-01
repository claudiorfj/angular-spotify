import { Injectable } from '@angular/core';
import { ITrack } from '../interfaces/ITrack';
import { BehaviorSubject } from 'rxjs';
import { newTrack } from '../common/factories';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentTrack = new BehaviorSubject<ITrack>(newTrack())
  timerId: any = null

  constructor(
    private spotifyService: SpotifyService
  ) {
    this.getCurrentTrack()
   }

  async getCurrentTrack(){
    clearTimeout(this.timerId)
    
    const track = await this.spotifyService.getCurrentTrack()
    this.setCurrentTrack(track)

    this.timerId = setInterval(async () => {
      await this.getCurrentTrack()
    }, 3000)
  }

  setCurrentTrack(track: ITrack){
    this.currentTrack.next(track)
  }

  async nextTrack(){
    await this.spotifyService.nextTrack()
  }

  async previousTrack(){
    await this.spotifyService.previousTrack()
  }
}
