import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
class PermissionService {
  
  constructor(public router: Router){}
  authService: AuthService = inject(AuthService);
}


export const authGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      if(!inject(PermissionService).authService.getUserToken("token")){
        if(state.url === '/login' || state.url === '/register'){
          return true;
        }
        if(state.url.match("/")){
          inject(PermissionService).router.navigateByUrl('/login')
          return false
        }
        return false;
      }
      if(inject(PermissionService).authService.getUserToken("token")){
        if(state.url.includes('/dashboard')){
          return true;
        }
        if(!state.url.includes('/dashboard')){
          inject(PermissionService).router.navigateByUrl('/')
          return false;
        }
        return false;
      }
      return false;
};