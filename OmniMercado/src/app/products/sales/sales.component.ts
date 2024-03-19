import { Component } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from '../service/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {

  products:Product[];
  
  constructor(private productService:ProductService){

  }

  ngOnInit(){
    this.productService.getUserAvailableProducts().subscribe({
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
