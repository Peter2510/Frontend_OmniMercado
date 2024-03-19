import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn:'root'
})

class PermissionsServiceAdmin {

  constructor(private loginService:LoginService,private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if(this.loginService.isLogged()&& this.loginService.getRole()==0){
      return true;
    }
    this.router.navigate(['visitante']);
    return false;
  }
}

export const adminGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsServiceAdmin).canActivate(next, state);
}
