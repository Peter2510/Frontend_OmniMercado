import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { Product } from '../models/Product';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
    
  products:Product[];
  
  constructor(private productService:ProductService){

  }

  ngOnInit(){
    this.productService.getAvailableProducts().subscribe({
      next: (r_success)=>{
          this.products = r_success.products;
      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

    public seeProductDetails(id:number){
      alert(`Details Product ${id}`)
    }

}
