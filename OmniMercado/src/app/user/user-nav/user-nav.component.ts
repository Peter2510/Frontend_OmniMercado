import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {


  constructor(public loginService:LoginService,private router:Router){

  }

  getEncodedImageSource() {
    const type = this.loginService.getTypeImage();
    const encodedImage = this.loginService.getEncodedImage();
    return `data:image/${type};base64,${encodedImage}`;
  }

  logOut(){
    this.loginService.logOut();
    window.location.reload();
  }

  rechargeCois(){
    this.router.navigate(['recargar-monedas']);
  }

}
