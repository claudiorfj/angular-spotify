import { Component, OnInit } from '@angular/core';
import { IArtist } from 'src/app/interfaces/IArtist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit {

  artists: IArtist[] = []

  constructor(private spotifyService: SpotifyService){}

  ngOnInit(): void {
    this.getTopArtists()
  }

  async getTopArtists(){
    this.artists = await this.spotifyService.getTopArtists(5)
  }
}
