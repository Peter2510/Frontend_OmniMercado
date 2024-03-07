import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Injectable({
  providedIn:'root'
})

class PermissionsServiceUser {

  constructor(private loginService:LoginService,private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if(this.loginService.estaLoggeado()&& this.loginService.getRol()==2){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}

export const usuarioGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsServiceUser).canActivate(next, state);
}
