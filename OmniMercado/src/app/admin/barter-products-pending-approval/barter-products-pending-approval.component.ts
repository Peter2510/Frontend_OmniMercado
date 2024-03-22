import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BarterService } from 'src/app/barters/service/barter.service';
import { BarterProduct } from 'src/app/models/BarterProduct';

@Component({
  selector: 'app-barter-products-pending-approval',
  templateUrl: './barter-products-pending-approval.component.html',
  styleUrls: ['./barter-products-pending-approval.component.css']
})
export class BarterProductsPendingApprovalComponent {
  
  barterProducts:BarterProduct[];

  constructor(private barterProductService:BarterService){}

  ngOnInit(){
    this.barterProductService.getBarderProductsPendingApproval().subscribe({
      next: (r_success)=>{

        this.barterProducts = r_success.barterProducts;

      },
      error: (err:HttpErrorResponse)=>{

      }
    })
  }

}
