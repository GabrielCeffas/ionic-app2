import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements  CanActivate{
  constructor(private storage: Storage, private router: Router){  }
  async canActivate(
    next:ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Promise<boolean> {
      let introSeen = await this.storage.get('seen-intro');
      if(!introSeen){
        this.router.navigateByUrl('/intro');
      } 
      return introSeen;
    }
  
}
