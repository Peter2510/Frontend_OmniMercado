import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/products/service/product.service';

@Component({
  selector: 'app-products-pending-approval',
  templateUrl: './products-pending-approval.component.html',
  styleUrls: ['./products-pending-approval.component.css']
})
export class ProductsPendingApprovalComponent {

  products:Product[]=[];

  constructor(private productService:ProductService){}

  ngOnInit(){
    this.productService.getProductsPendingApproval().subscribe({
      next: (r_success)=>{

        this.products = r_success.products;

      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

}
