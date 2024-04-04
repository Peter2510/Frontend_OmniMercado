import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/products/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-pending-approval',
  templateUrl: './products-pending-approval.component.html',
  styleUrls: ['./products-pending-approval.component.css']
})
export class ProductsPendingApprovalComponent {

  products:Product[]=[];

  constructor(private productService:ProductService,private router:Router){}

  ngOnInit(){
    this.productService.getProductsPendingApproval().subscribe({
      next: (r_success)=>{

        this.products = r_success.products;

      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

  public seeProductDetails(id:any){
    this.productService.sendId({ id: id });
    this.router.navigate(['/info-producto-a']);
  }

  approveProduct(event: any,id:any) {
    this.productService.setProductToAvailable(id).subscribe({
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
    this.productService.setProductToRejected(id).subscribe({
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
