import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './player.component';
import { PlayerRoutes } from './player.routes';
import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel.component';
import { MenuButtonComponent } from 'src/app/components/menu-button/menu-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterUserComponent } from 'src/app/components/footer-user/footer-user.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistComponent } from 'src/app/components/top-artist/top-artist.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';
import { RecentSearchesComponent } from 'src/app/components/recent-searches/recent-searches.component';
import { FormsModule } from '@angular/forms';
import { TopArtistsComponent } from 'src/app/components/top-artists/top-artists.component';
import { ArtistItemImageComponent } from 'src/app/components/artist-item-image/artist-item-image.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { TrackListComponent } from '../track-list/track-list.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';

@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    FooterUserComponent,
    HomeComponent,
    TopArtistComponent,
    MenuButtonComponent,
    RightPanelComponent,
    RecentSearchesComponent,
    TopArtistsComponent,
    ArtistItemImageComponent,
    PlayerCardComponent,
    TrackListComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRoutes)
  ]
})
export class PlayerModule { }
