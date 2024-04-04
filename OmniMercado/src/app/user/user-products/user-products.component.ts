import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/products/service/product.service';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent {

  products:Product[] =[];

  constructor(private productService:ProductService){}

  ngOnInit(){
    this.productService.getUserProducts().subscribe({
      next: (r_success)=>{
          this.products = r_success.products;
          console.log(this.products);
          
      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

}
