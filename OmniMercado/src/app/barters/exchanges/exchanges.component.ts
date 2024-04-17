import { Component } from '@angular/core';
import { BarterProduct } from 'src/app/models/BarterProduct';
import { BarterService } from '../service/barter.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css']
})
export class ExchangesComponent {
  
  barterProducts:BarterProduct[] =[];

  constructor(private barterProductService:BarterService,private router:Router){}

  ngOnInit(){
    this.barterProductService.getUserAvailableProducts().subscribe({
      next: (r_success)=>{
          this.barterProducts = r_success.barterProducts;
          
      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

  public seeProductDetails(id:any){
    this.barterProductService.sendId({ id: id });
    this.router.navigate(['/info-intercambio-u']);
  }
}
