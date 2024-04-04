import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { Product } from '../models/Product';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
    
  products:Product[]=[];
  
  constructor(private productService:ProductService,private router:Router){

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

    public seeProductDetails(id:any){
      this.productService.sendId({ id: id });
      this.router.navigate(['/info-producto-v']);
    }

}
