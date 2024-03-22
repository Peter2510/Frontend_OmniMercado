import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BarterService } from 'src/app/barters/service/barter.service';
import { BarterProduct } from 'src/app/models/BarterProduct';

@Component({
  selector: 'app-user-barter-products',
  templateUrl: './user-barter-products.component.html',
  styleUrls: ['./user-barter-products.component.css']
})
export class UserBarterProductsComponent {

  barterProducts:BarterProduct[] =[];

  constructor(private barterproductService:BarterService){}

  ngOnInit(){
    this.barterproductService.getUserBarterProducts().subscribe({
      next: (r_success)=>{
          this.barterProducts = r_success.barterProducts;
      },
      error: (err:HttpErrorResponse)=>{
        
      }
    })
  }
}
