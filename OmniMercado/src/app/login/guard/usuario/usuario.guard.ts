import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Injectable({
  providedIn:'root'
})

class PermissionsServiceUser {

  constructor(private loginService:LoginService,private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if(this.loginService.isLogged()&& this.loginService.getRole()==1){
      return true;
    }
    this.router.navigate(['visitante']);
    return false;
  }
}

export const usuarioGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsServiceUser).canActivate(next, state);
}
