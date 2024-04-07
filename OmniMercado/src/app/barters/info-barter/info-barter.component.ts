import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BarterProduct } from 'src/app/models/BarterProduct';
import { BarterService } from '../service/barter.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-barter',
  templateUrl: './info-barter.component.html',
  styleUrls: ['./info-barter.component.css']
})
export class InfoBarterComponent implements OnDestroy, OnInit{
  
  private subscription: Subscription;
  public barterProduct:BarterProduct;
  private idBarterProduct: number;

  constructor(private barterProductService: BarterService,private router:Router) {
  }

  ngOnInit(): void {
    this.subscription = this.barterProductService.data$.subscribe(data => {
      if (data) {
        this.idBarterProduct = data.id;
      }else{
        this.router.navigate(['not-found']);
      }
    });

    if(this.idBarterProduct){
      this.barterProductService.getBarterProductById(this.idBarterProduct).subscribe({
        next: (r_success) => {
          this.barterProduct = r_success.barterProduct;
        },
        error: (err) => {
         this.handleErrorResponse(err); 
        }
      })
    }
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleErrorResponse(error: HttpErrorResponse) {
    if (error.status == 400) {
      Swal.fire('', `${error.error.message}`, 'warning');
    } else {
      console.log(error.error)
      Swal.fire('Lo sentimos', `Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.`, 'warning');
    }
  }

}
