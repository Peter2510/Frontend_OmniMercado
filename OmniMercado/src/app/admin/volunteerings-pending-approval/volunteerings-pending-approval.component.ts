import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Volunteering } from 'src/app/models/Volunteering';
import { VolunteeringService } from 'src/app/volunteering/service/volunteering.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-volunteerings-pending-approval',
  templateUrl: './volunteerings-pending-approval.component.html',
  styleUrls: ['./volunteerings-pending-approval.component.css']
})
export class VolunteeringsPendingApprovalComponent {

  volunteerings:Volunteering[]=[];

  constructor(private volunteeringService:VolunteeringService,private router:Router){}

  ngOnInit(){

    this.volunteeringService.getVolunteeringPendingApproval().subscribe({
      next: (r_success)=>{

        this.volunteerings = r_success.volunteerings;

      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

  public seeProductDetails(id:any){
    this.volunteeringService.sendId({ id: id });
    this.router.navigate(['/info-producto-a']);
  }

  approveProduct(event: any,id:any) {
    this.volunteeringService.setVolunteeringToAvailable(id).subscribe({
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
    this.volunteeringService.setVolunteeringToRejected(id).subscribe({
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
