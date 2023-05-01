import { Component, OnInit } from '@angular/core';
import { faCirclePause, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { newArtist } from 'src/app/common/factories';
import { IArtist } from 'src/app/interfaces/IArtist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss']
})
export class TopArtistComponent implements OnInit {

  topArtist: IArtist = newArtist();
  
  playIcon = faCirclePlay
  pauseIcon = faCirclePause

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getArtist();
  }

  async getArtist(){
    const artists = await this.spotifyService.getTopArtists(1);

    if (!!artists)
      this.topArtist = artists.pop();
  }

}
