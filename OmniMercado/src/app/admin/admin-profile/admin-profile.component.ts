import { Component } from '@angular/core';
import { Admin } from 'src/app/models/Admin';
import { AdminService } from '../service/admin.service';
import { LoginService } from 'src/app/login/service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {

  admin:Admin;

  
  constructor(private adminService:AdminService,private loginService:LoginService){
    this.getAdminProfile();
  }
  
  ngOnInit(): void {
    this.getAdminProfile();
  }


  getAdminProfile(){
      this.adminService.getAdminProfile().subscribe({
        next: (r_sucess)=>{
          this.admin = r_sucess.admin;
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
