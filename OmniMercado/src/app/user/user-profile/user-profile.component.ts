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
export class UserProfileComponent implements OnInit {

  user: User;
  mostrarInformacion: Number;


  constructor(private userService: UserService, private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.getUserProfile();
  }


  getUserProfile() {
    this.userService.getUserProfile().subscribe({
      next: (r_sucess) => {
        this.user = r_sucess.user;
        this.mostrarInformacion = this.user.informacion_visible_para_todos;
      },
      error: (error: HttpErrorResponse) => {
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
    console.error(error.error.message)
  }

  update() {
    this.userService.updateUser(this.mostrarInformacion).subscribe({
      next: (r_success) => {
        Swal.fire(
          '¡Actualización exitosa!',
          r_success.message,
          'success'
        );
      },
      error: (error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
      }
    });
  }

  toggleMostrarInformacion() {
    if (this.mostrarInformacion === 1) {
      this.mostrarInformacion = 0;
    } else {
      this.mostrarInformacion = 1;
    }
  }
  
}
