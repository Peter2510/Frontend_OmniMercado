import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SignupService } from './service/signup.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  data = {
    name: '',
    email: '',
    birthYear: '',
    password: '',
    confpassword: ''
  };

  nameNull = true;
  emailNull = true;
  passNull = true;
  dateNull = true;
  isAdult = true;
  confpassNull = true;
  samePass = true;
  
  constructor(private signupService: SignupService, private router: Router) {

  }


  validateCredentials() {
    this.nameNull = this.data.name !== '';
    this.emailNull = this.data.email !== '';
    this.dateNull = this.data.birthYear !== '';
    this.passNull = this.data.password !== '';
    this.confpassNull = this.data.confpassword !== '';
    this.samePass = this.data.password == this.data.confpassword;

    if (this.dateNull) {
        const _date = new Date();
        const yearUser = new Date(this.data.birthYear).getFullYear();
        this.isAdult = _date.getFullYear() - yearUser >= 18;
    }

    if (this.nameNull && this.emailNull && this.samePass && this.isAdult && this.dateNull) {
        this.validateEmailAndCreateUser();
    }
}

validateEmailAndCreateUser() {
    this.signupService.validateEmail(this.data.email).subscribe({
        next: (r_exitosa) => {
            this.createUser();
        },
        error: (error: HttpErrorResponse) => {
            this.handleErrorResponse(error);
        }
    });
}

createUser() {
    this.signupService.crearUsuario(this.data).subscribe({
        next: (r_exitosa) => {
            this.handleSuccessfulUserCreation(r_exitosa);
        },
        error: (error: HttpErrorResponse) => {
            this.handleErrorResponse(error);
        }
    });
}

handleSuccessfulUserCreation(r_exitosa: any) {
    Swal.fire('', `${r_exitosa.message}`, 'success').then(() => {
        this.router.navigate(['login']);
        this.signupService.signupStatusSubject.next(true);
    });
}

handleErrorResponse(error: HttpErrorResponse) {
    if (error.status == 400) {
        Swal.fire('', `${error.error.message}`, 'warning');
    } else {
        Swal.fire('Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`, 'warning');
    }
}


}
