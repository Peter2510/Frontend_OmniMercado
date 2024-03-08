import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from '../models/User';
import { Admin } from '../models/Admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{

  loginData ={
    email: '',
    password: ''
  }

  emailNull = false
  passNull  = false

  constructor(private loginService: LoginService,private router:Router) {
    
  }
  

  validateCredentials(){
  
    this.emailNull = this.loginData.email == '';
    this.passNull = this.loginData.password == '';

    if(!this.emailNull && !this.passNull){
      
      this.validateEmailAndPassword();
      
    }

  }

  validateEmailAndPassword() {
    this.loginService.validateCredentials(this.loginData).subscribe({
        next: (r_success) => {
          
          if(r_success.user){
            let user:User = r_success.user;
            if(user.activo_plataforma){
              user.tipo_usuario = 1;
              this.loginService.startSesion(user);
              this.router.navigate(['usuario']);
              this.loginService.loginStatusSubject.next(true);
            }else{
              Swal.fire('Tu cuenta ha sido suspendida','Contacta con los administradores','error')
            }

          }else if(r_success.admin){
            //admin
            let admin:Admin = r_success.admin;

            if(admin.activo){
              admin.tipo_usuario = 0;
              this.loginService.startSesion(admin);
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
            }else{
              Swal.fire('Tu cuenta administrativa ha sido suspendida','Contacta con los administradores','error')
            }
          }else{
            Swal.fire('Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`, 'error');
          }

        },
        error: (error: HttpErrorResponse) => {
            this.handleErrorResponse(error);
        }
    });
}

  handleErrorResponse(error: HttpErrorResponse) {
    if (error.status == 401) {
        Swal.fire('', `${error.error.message}`, 'warning');
    } else {
        Swal.fire('Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`, 'warning');
    }
}

  

}
