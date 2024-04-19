import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarterService } from 'src/app/barters/service/barter.service';
import { BarterProduct } from 'src/app/models/BarterProduct';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barters-reports',
  templateUrl: './barters-reports.component.html',
  styleUrls: ['./barters-reports.component.css']
})
export class BartersReportsComponent {
  
  products:BarterProduct[]=[];

  constructor(private barterService:BarterService,private router:Router){}

  ngOnInit(){
    this.barterService.getReportedProducts().subscribe({
      next: (r_success)=>{

        this.products = r_success.barters;

      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

  public seeProductDetails(id:any){
    this.barterService.sendId({ id: id });
    this.router.navigate(['/info-reporte-intercambio']);
  }

  approveProduct(event: any,id:any) {
    this.barterService.aproveReports(id).subscribe({
      next: (r_success)=>{
          this.handleSuccessResponse(r_success);
      },
      error: (err:HttpErrorResponse)=>{
        this.handleErrorResponse(err);
      }
    })
    event.stopPropagation();
  }

  rejectProduct(event: any,id:any) {
    this.barterService.rejectReports(id).subscribe({
      next: (r_success)=>{
        this.handleSuccessResponse(r_success);
      },
      error: (err:HttpErrorResponse)=>{
        this.handleErrorResponse(err);
      }
    })
    event.stopPropagation();
  }

  handleSuccessResponse(response: any) {
    Swal.fire({
      icon: "success",
      title: response.message,
      showConfirmButton: false,
      timer: 1300
    }).then(() => {
      window.location.reload();
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
}