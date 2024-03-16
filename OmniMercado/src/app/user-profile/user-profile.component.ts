import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent{

  constructor(private login: LoginService) { }


}
