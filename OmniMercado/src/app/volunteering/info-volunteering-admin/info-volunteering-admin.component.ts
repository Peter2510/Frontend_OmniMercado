import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { VolunteeringService } from '../service/volunteering.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-volunteering-admin',
  templateUrl: './info-volunteering-admin.component.html',
  styleUrls: ['./info-volunteering-admin.component.css']
})
export class InfoVolunteeringAdminComponent {

  private subscription: Subscription;

  constructor(private volunteeringService: VolunteeringService, private router: Router) { }

  approveVolunteering() {
    this.subscription = this.volunteeringService.data$.subscribe(data => {
      if (data) {
        this.volunteeringService.setVolunteeringToAvailable(data.id).subscribe({
          next: (r_success) => {
            this.handleSuccessResponse(r_success);
          },
          error: (err: HttpErrorResponse) => {  
            this.handleErrorResponse(err);
          }
        })
      } else {
        this.router.navigate(['not-found']);
      }
    });

  }

  rejectVolunteering() {
    this.subscription = this.volunteeringService.data$.subscribe(data => {
      if (data) {
        this.volunteeringService.setVolunteeringToRejected(data.id).subscribe({
          next: (r_success) => {
            this.handleSuccessResponse(r_success);
          },
          error: (err: HttpErrorResponse) => {
            this.handleErrorResponse(err);
          }
        })
      } else {
        this.router.navigate(['not-found']);
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
      this.router.navigate(['aprobacion-voluntariados']);
    });
  }

  handleErrorResponse(error: HttpErrorResponse) {
    Swal.fire({
      icon: 'error',
      title: `${error.message}`,
      timer: 1300
    }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }


  }

}