import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  { path: 'menu', 
  loadChildren: './pages/menu/menu.module#MenuPageModule',
  canActivate: [IntroGuard]
  },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: '', redirectTo: 'menu/tracker', pathMatch: 'full' },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
