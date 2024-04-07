import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BarterService } from 'src/app/barters/service/barter.service';
import { BarterProduct } from 'src/app/models/BarterProduct';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barter-products-pending-approval',
  templateUrl: './barter-products-pending-approval.component.html',
  styleUrls: ['./barter-products-pending-approval.component.css']
})
export class BarterProductsPendingApprovalComponent {
  
  barterProducts:BarterProduct[]=[];

  constructor(private barterProductService:BarterService){}

  ngOnInit(){
    this.barterProductService.getBarderProductsPendingApproval().subscribe({
      next: (r_success)=>{

        this.barterProducts = r_success.barterProducts;

      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

  approveBarterProduct(event: any,id:any) {
    this.barterProductService.setBarterProductToAvailable(id).subscribe({
      next: (r_success)=>{
          this.handleSuccessResponse(r_success);
      },
      error: (err:HttpErrorResponse)=>{
        this.handleErrorResponse(err);
      }
    })
    event.stopPropagation();
  }

  rejectBarterProduct(event: any,id:any) {
    this.barterProductService.setBarterProductToRejected(id).subscribe({
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
