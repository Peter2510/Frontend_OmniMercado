import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarterService } from 'src/app/barters/service/barter.service';
import { BarterProduct } from 'src/app/models/BarterProduct';

@Component({
  selector: 'app-my-barters',
  templateUrl: './my-barters.component.html',
  styleUrls: ['./my-barters.component.css']
})
export class MyBartersComponent {

  barterProducts:BarterProduct[] =[];

  constructor(private productBarterService:BarterService,private router:Router){}

  ngOnInit(){
    this.productBarterService.getUserExchanges().subscribe({
      next: (r_success)=>{
          this.barterProducts = r_success.exchanges;
      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

  public seeProductDetails(id:any){
    this.productBarterService.sendId({ id: id });
    this.router.navigate(['/info-intercambio-u']);
  }

}
