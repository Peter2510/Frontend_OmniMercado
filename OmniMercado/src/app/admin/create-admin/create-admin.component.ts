import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/Admin';
import { Gender } from 'src/app/models/Gender';
import { SignupService } from 'src/app/signup/service/signup.service';
import Swal from 'sweetalert2';
import { AdminService } from '../service/admin.service';
import { Rol } from 'src/app/models/Rol';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent {

  admin = {
    name: '',
    email: '',
    password: '',
    confpassword: '',
    gender: 0,
    rol: 0
  };


  nameNull = true;
  emailNull = true;
  passNull = true;
  confpassNull = true;
  samePass = true;
  genderNull = true;
  rolNull = true;

  genders: Gender[];
  roles: Rol[];

  constructor(private signupService: SignupService, private router: Router, private adminService: AdminService) {
    this.getRoles();
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

  getRoles() {
    this.adminService.getRoles().subscribe({
      next: (r_success) => {
        this.roles = r_success.roles
      },
      error: (error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
      }
    });
  }

  handleErrorResponse(error: HttpErrorResponse) {
    if (error.status == 400) {
      Swal.fire('', `${error.error.message}`, 'warning');
    } else {
      console.log(error.error)
      Swal.fire('Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`, 'warning');
    }
  }

  validateCredentials() {
    this.nameNull = this.admin.name !== '';
    this.emailNull = this.admin.email !== '';
    this.passNull = this.admin.password !== '';
    this.confpassNull = this.admin.confpassword !== '';
    this.samePass = (this.admin.password == this.admin.confpassword) && this.admin.password.length>0;
    this.genderNull = this.admin.gender != 0;
    this.rolNull = this.admin.rol != 0;

    if (this.nameNull && this.emailNull && this.samePass && this.genderNull) {
      this.validateEmailAndCreateadmin();
    }
  }

  validateEmailAndCreateadmin() {
    this.signupService.validateEmail({ email: this.admin.email }).subscribe({
      next: (r_success) => {
        this.createadmin();
      },
      error: (error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
      }
    });
  }

  createadmin() {
    this.adminService.createAdmin(this.admin).subscribe({
      next: (r_success) => {
        this.handleSuccessfuladminCreation(r_success);
      },
      error: (error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
      }
    });
  }

  handleSuccessfuladminCreation(r_success: any) {
    Swal.fire('', `${r_success.message}`, 'success').then(() => {
      this.router.navigate(['admin']);
      this.signupService.signupStatusSubject.next(true);
    });
  }





}
