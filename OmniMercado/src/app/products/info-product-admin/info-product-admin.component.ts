import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-product-admin',
  templateUrl: './info-product-admin.component.html',
  styleUrls: ['./info-product-admin.component.css']
})
export class InfoProductAdminComponent {

  private subscription: Subscription;

  constructor(private productService: ProductService, private router: Router) { }

  approveVolunteering() {
    this.subscription = this.productService.data$.subscribe(data => {
      if (data) {
        this.productService.setProductToAvailable(data.id).subscribe({
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
    this.subscription = this.productService.data$.subscribe(data => {
      if (data) {
        this.productService.setProductToRejected(data.id).subscribe({
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
      this.router.navigate(['aprobacion-productos']);
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
