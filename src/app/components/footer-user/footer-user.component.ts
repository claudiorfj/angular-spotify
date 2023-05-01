import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/interfaces/IUser';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-footer-user',
  templateUrl: './footer-user.component.html',
  styleUrls: ['./footer-user.component.scss']
})
export class FooterUserComponent implements OnInit{

  logoutIcon = faSignOutAlt;
  user: IUser = null;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
      this.user = this.spotifyService.user
  }

  logout(){
    this.spotifyService.logout()
  }

}
