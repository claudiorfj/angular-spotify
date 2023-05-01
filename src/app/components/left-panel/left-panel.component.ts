import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faSearch, faMusic } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit{

  selectedMenu = 'Home'

  playlists: IPlaylist[] = [];

  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    ){}

  ngOnInit(): void {
    this.getPlaylists()
  }

  clickButton(button: string){
    this.selectedMenu = button
    this.router.navigateByUrl('player/home');
  }

  async getPlaylists(){
    this.playlists = await this.spotifyService.getPlaylistUser()
  }

  goToPlaylist(playlistId: string){
    this.selectedMenu = playlistId
    this.router.navigateByUrl(`player/list/playlist/${playlistId}`)
  }

}
