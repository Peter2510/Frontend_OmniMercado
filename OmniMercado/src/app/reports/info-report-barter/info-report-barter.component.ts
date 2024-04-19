import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BarterService } from 'src/app/barters/service/barter.service';
import { ReportBarter } from 'src/app/models/ReportBarter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-report-barter',
  templateUrl: './info-report-barter.component.html',
  styleUrls: ['./info-report-barter.component.css']
})
export class InfoReportBarterComponent implements OnInit {
  
  private subscription: Subscription;
  reportsProduct:ReportBarter[];
  idProduct: number;
  
  constructor(private productBarter: BarterService, private router: Router) { }
  ngOnInit(): void {
    this.getIdProduct();
    this.productBarter.getReportsProduct(this.idProduct).subscribe({
      next: (r_success) => {
        this.reportsProduct = r_success.reportes;
      },
      error: (err: HttpErrorResponse) => {
        this.handleErrorResponse(err);
      }
    });
  }

  getIdProduct() {
    this.subscription = this.productBarter.data$.subscribe(data => {
      if (data) {
        this.idProduct = data.id;
      } else {
        this.router.navigate(['not-found']);
      }
    });
  }

  approveReport() {
    this.subscription = this.productBarter.data$.subscribe(data => {
      if (data) {
        this.productBarter.aproveReports(data.id).subscribe({
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
    this.subscription = this.productBarter.data$.subscribe(data => {
      if (data) {
        this.productBarter.rejectReports(data.id).subscribe({
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
