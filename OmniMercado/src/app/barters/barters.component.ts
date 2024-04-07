import { Component } from '@angular/core';
import { BarterProduct } from '../models/BarterProduct';
import { BarterService } from './service/barter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barters',
  templateUrl: './barters.component.html',
  styleUrls: ['./barters.component.css']
})
export class BartersComponent {

  getAvailableBarterProducts

  barterProducts:BarterProduct[]=[];
  
  constructor(private productBarterService:BarterService,private router:Router){

  }

  ngOnInit(){
    this.productBarterService.getAvailableBarterProducts().subscribe({
      next: (r_success)=>{
          this.barterProducts = r_success.barterProducts;
      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

  public seeProductDetails(id:any){
    this.productBarterService.sendId({ id: id });
    this.router.navigate(['/info-intercambio-v']);
  }

}
