import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReportProduct } from 'src/app/models/ReportProduct';
import { ProductService } from 'src/app/products/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-report-product',
  templateUrl: './info-report-product.component.html',
  styleUrls: ['./info-report-product.component.css']
})
export class InfoReportProductComponent implements OnInit {
  
  private subscription: Subscription;
  reportsProduct:ReportProduct[];
  idProduct: number;
  
  constructor(private productService: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.getIdProduct();
    this.productService.getReportsProduct(this.idProduct).subscribe({
      next: (r_success) => {
        this.reportsProduct = r_success.reportes;
      },
      error: (err: HttpErrorResponse) => {
        this.handleErrorResponse(err);
      }
    });
  }

  getIdProduct() {
    this.subscription = this.productService.data$.subscribe(data => {
      if (data) {
        this.idProduct = data.id;
      } else {
        this.router.navigate(['not-found']);
      }
    });
  }

  approveReport() {
    this.subscription = this.productService.data$.subscribe(data => {
      if (data) {
        this.productService.aproveReports(data.id).subscribe({
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

  rejectReport() {
    this.subscription = this.productService.data$.subscribe(data => {
      if (data) {
        this.productService.rejectReports(data.id).subscribe({
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
