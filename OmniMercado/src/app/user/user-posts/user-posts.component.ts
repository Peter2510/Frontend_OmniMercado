import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/products/service/product.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent {

  products:Product[];

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
