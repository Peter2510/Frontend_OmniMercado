import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/products/service/product.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent {

  products:Product[] =[];

  constructor(private productService:ProductService,private router:Router){}

  ngOnInit(){
    this.productService.getUserPurchaseProducts().subscribe({
      next: (r_success)=>{
          this.products = r_success.products;
      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

  public seeProductDetails(id:any){
    this.productService.sendId({ id: id });
    this.router.navigate(['/info-producto-u']);
  }
}

