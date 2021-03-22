import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ReadOnlyGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(!this.authenticationService.hasFetchedState) {
      const promise =  this.authenticationService.fetchReadonly();
      promise.then(r => {
        if(!r) {
          this.router.navigateByUrl('/home');
        }
      });
      return promise;
    }
    
    if(this.authenticationService.isReadonly) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}