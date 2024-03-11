import { Component } from '@angular/core';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(public loginService:LoginService){

  }

}
