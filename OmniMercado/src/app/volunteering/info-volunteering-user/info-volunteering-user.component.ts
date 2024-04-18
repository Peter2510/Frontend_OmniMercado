import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { VolunteeringService } from '../service/volunteering.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-volunteering-user',
  templateUrl: './info-volunteering-user.component.html',
  styleUrls: ['./info-volunteering-user.component.css']
})
export class InfoVolunteeringUserComponent {

  private subscription: Subscription;
  private idVolunteering: number;
  stateVolunteering: number;
  private age:number;
  seeButton = false;

  constructor(private volunteeringService: VolunteeringService, private router: Router, private loginService: LoginService) {
    
    this.getAge();
    this.getIdVolunteering();
    this.notAvailable();
    this.getStateVolunteering();
  }

  getIdVolunteering() {
    this.subscription = this.volunteeringService.data$.subscribe(data => {
      if (data) {
        this.idVolunteering = data.id;
      } else {
        this.router.navigate(['not-found']);
      }
    });
  }

  getAge() {
    this.loginService.getAge().subscribe({
      next: (response) => {
        this.age = response.age;
      },
      error: (err: HttpErrorResponse) => {
        this.handleErrorResponse(err);
      }
    })
  }

  getStateVolunteering(){
    this.volunteeringService.getStateVolunteering(this.idVolunteering).subscribe({
      next: (response) => {
        this.stateVolunteering = response.state;
      },
      error: (err: HttpErrorResponse) => {
        this.handleErrorResponse(err);
      }
    })
  }

  notAvailable() {
      this.volunteeringService.validateIfUserIsRegistered(this.idVolunteering).subscribe({ 
        next: (response) => {
          if (response.registered) {
            this.seeButton = false;
          } else {
            this.seeButton = true;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.handleErrorResponse(err);
        }
       });
  }

  register() {
    this.volunteeringService.getRestricionVolunteering(this.idVolunteering).subscribe({
      next: (r_success) => {
        let min = parseInt(r_success.volunteering.minimo_edad);
        let max = parseInt(r_success.volunteering.maximo_edad);
      
        if (this.age < min || this.age > max) {
          Swal.fire({
            icon: 'info',
            title: 'No cumples con los requisitos de edad',
            text: 'Para poder registrarte debes tener entre ' + min + ' y ' + max + ' años',
          });
          return;
        }


        Swal.fire({
          title: '¿Estás seguro de querer registrarte?',
          text: 'Una vez registrado no podrás deshacer esta acción',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, registrarme',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.volunteeringService.registerVolunteering(this.idVolunteering).subscribe({
              next: (response) => {
                this.handleSuccessResponse(response);
              },
              error: (err: HttpErrorResponse) => {
                this.handleErrorResponse(err);
              }
            });
          }
        });
      }
    });
  }

  handleSuccessResponse(response: any) {
    Swal.fire({
      icon: "success",
      title: response.message,
      showConfirmButton: false,
      timer: 1300
    }).then(() => {
      this.router.navigate(['registro-voluntariados']);
    });
  }

  handleErrorResponse(error: HttpErrorResponse) {
    Swal.fire({
      icon: 'error',
      title: `${error.error.message}`,
    }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
