import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from '../service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  
  user:User;

  
  constructor(private userService:UserService,private loginService:LoginService){

  }
  
  ngOnInit(): void {
    this.getUserProfile();
  }


  getUserProfile(){
      this.userService.getUserProfile().subscribe({
        next: (r_sucess)=>{
          this.user = r_sucess.user;
        },
        error: (error: HttpErrorResponse)=>{
          this.handleErrorResponse(error);
        }
      })
  }

  getEncodedImageSource() {
    const type = this.loginService.getTypeImage();
    const encodedImage = this.loginService.getEncodedImage();
    return `data:image/${type};base64,${encodedImage}`;
  }

  handleErrorResponse(error: HttpErrorResponse) {
    Swal.fire(
      'Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`,
      'warning'
    );
  }


}
