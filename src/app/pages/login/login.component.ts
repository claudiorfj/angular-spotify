import { Router } from '@angular/router';
import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (
    private spotifyService: SpotifyService,
    private router: Router,
    ){}

  ngOnInit(): void {
    this.verifyTokenUrlCallback()
  }

  openLoginPage(){
    window.location.href = this.spotifyService.getUrlLogin()
  }

  verifyTokenUrlCallback(){
    const token = this.spotifyService.getTokenUrlCallback()
    if (!!token){
      this.spotifyService.setAccessUrlToken(token)
      this.router.navigate(['/player/home'])
    }
  }

}
