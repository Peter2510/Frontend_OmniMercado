import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SignupService } from './service/signup.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Gender} from '../models/Gender'



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user = {
    name: '',
    email: '',
    birthYear: '',
    password: '',
    confpassword: ''
  };

  genders:Gender[];

  nameNull = true;
  emailNull = true;
  passNull = true;
  dateNull = true;
  isAdult = true;
  confpassNull = true;
  samePass = true;
  
  constructor(private signupService: SignupService, private router: Router) {
    this.getGenders()
  }

  getGenders() {
    this.signupService.getGenders().subscribe({
        next: (r_success) => {
            this.genders = r_success.genders
        },
        error: (error: HttpErrorResponse) => {
            this.handleErrorResponse(error);
        }
    });
}


  validateCredentials() {
    this.nameNull = this.user.name !== '';
    this.emailNull = this.user.email !== '';
    this.dateNull = this.user.birthYear !== '';
    this.passNull = this.user.password !== '';
    this.confpassNull = this.user.confpassword !== '';
    this.samePass = this.user.password == this.user.confpassword;

    if (this.dateNull) {
        const _date = new Date();
        const yearUser = new Date(this.user.birthYear).getFullYear();
        this.isAdult = _date.getFullYear() - yearUser >= 18;
    }

    if (this.nameNull && this.emailNull && this.samePass && this.isAdult && this.dateNull) {
        this.validateEmailAndCreateUser();
    }
}

validateEmailAndCreateUser() {
    this.signupService.validateEmail({email:this.user.email}).subscribe({
        next: (r_exitosa) => {
            this.createUser();
        },
        error: (error: HttpErrorResponse) => {
            this.handleErrorResponse(error);
        }
    });
}

createUser() {
    this.signupService.createUser(this.user).subscribe({
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
