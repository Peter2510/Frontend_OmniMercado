import { Component } from '@angular/core';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {


  constructor(public loginService:LoginService){

  }

  getEncodedImageSource() {
    const type = this.loginService.getTypeImage(); // Suponiendo que esta función devuelve el tipo de imagen
    const encodedImage = this.loginService.getEncodedImage(); // Suponiendo que esta función devuelve la imagen codificada en Base64
    return `data:image/${type};base64,${encodedImage}`;
  }

  logOut(){
    this.loginService.logOut();
    window.location.reload();
  }

}
