import { AutenticateGuard } from './guards/autenticate.guard'
import { Routes } from "@angular/router";

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full'
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule),
    canLoad: [AutenticateGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
  }
]
