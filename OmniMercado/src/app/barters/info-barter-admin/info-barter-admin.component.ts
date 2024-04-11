import { Component } from '@angular/core';
import { BarterService } from '../service/barter.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-barter-admin',
  templateUrl: './info-barter-admin.component.html',
  styleUrls: ['./info-barter-admin.component.css']
})
export class InfoBarterAdminComponent {

  private subscription: Subscription;
  
  constructor(private barterProductService: BarterService,private router:Router) { }

  approveBarterProduct(event: any) {
    this.subscription = this.barterProductService.data$.subscribe(data => {
      if (data) {
        this.barterProductService.setBarterProductToAvailable(data.id).subscribe({
          next: (r_success) => {
            event.stopPropagation();
            this.handleSuccessResponse(r_success);
          },
          error: (err: HttpErrorResponse) => {
            event.stopPropagation();
            this.handleErrorResponse(err);
          }
        })
        event.stopPropagation();
      }else{
        this.router.navigate(['not-found']);
      }
    });
    
  }

  rejectBarterProduct(event: any) {
    
    this.subscription = this.barterProductService.data$.subscribe(data => {
      if (data) {
        this.barterProductService.setBarterProductToRejected(data.id).subscribe({
          next: (r_success) => {
            event.stopPropagation();
            this.handleSuccessResponse(r_success);
          },
          error: (err: HttpErrorResponse) => {
            event.stopPropagation();
            this.handleErrorResponse(err);
          }
        })
        event.stopPropagation();
      }else{
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
      this.router.navigate(['aprobacion-intercambios']);
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
