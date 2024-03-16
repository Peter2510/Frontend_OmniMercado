import { Component } from '@angular/core';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {


  constructor(public loginService:LoginService){

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


}
